import { useRef, useState, useEffect } from "react";
import {
  sampleGrid,
  makeStream,
  buildSVG,
  removeBg,
  blobToImage,
  autoCropAlpha,
  DARK_OP,
  LIGHT_OP,
  type Picture,
} from "./portrait";
import { Shell, type ViewProps } from "./shared";
const snippet = `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/hero-light.svg">
  <img alt="my portrait, rendered in my tech stack — made with stackface" src="./assets/hero-dark.svg" width="60%">
</picture>`;
export default function Controller({ Page, css, title }: ViewProps) {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<Picture | null>(null);
  const [cutout, setCutout] = useState<Picture | null>(null);
  const [cols, setCols] = useState(78);
  const [gamma, setGamma] = useState(85);
  const [cutoff, setCutoff] = useState(8);
  const [remove, setRemove] = useState(true);
  const [words, setWords] = useState(
    "python, react, nextjs, flask, django, aws, socketio, mysql, postgres, docker, redis, stripe, typescript, websockets, git, linux",
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [svg, setSVG] = useState<{ dark: string; light: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("waiting for a photo…");
  const [over, setOver] = useState(false);
  const version = useRef(0);
  const alive = useRef(true);
  useEffect(
    () => () => {
      alive.current = false;
      version.current++;
    },
    [],
  );
  async function choose(f: File) {
    if (!f.type.startsWith("image/")) {
      setStatus("that is not an image");
      return;
    }
    const v = ++version.current;
    setBusy(true);
    setFile(f);
    setImage(null);
    setCutout(null);
    try {
      const loaded = await blobToImage(f);
      if (v === version.current && alive.current) {
        setImage(loaded);
        setStatus("photo loaded — hit generate");
      }
    } catch {
      if (v === version.current && alive.current)
        setStatus("could not decode that image");
    } finally {
      if (v === version.current && alive.current) setBusy(false);
    }
  }
  async function generate() {
    if (!image || !file || busy) return;
    const v = version.current;
    setBusy(true);
    let fallback = false;
    try {
      let source = image;
      let useAlpha = false;
      if (remove) {
        let cropped = cutout;
        if (!cropped) {
          const blob = await removeBg(file, (s) => {
            if (v === version.current && alive.current) setStatus(s);
          });
          if (blob) cropped = autoCropAlpha(await blobToImage(blob));
          else fallback = true;
          if (v === version.current && alive.current) setCutout(cropped);
        }
        if (cropped) {
          source = cropped;
          useAlpha = true;
        }
      }
      if (v !== version.current || !alive.current) return;
      const grid = sampleGrid(
        source,
        cols,
        gamma / 100,
        useAlpha,
        cutoff / 100,
      );
      if (!grid.cells) throw Error("could not read any pixels from that image");
      const stream = makeStream(words);
      setSVG({
        dark: buildSVG(
          { ...grid, cells: grid.cells },
          stream,
          DARK_OP,
          "#e6edf3",
        ),
        light: buildSVG(
          { ...grid, cells: grid.cells },
          stream,
          LIGHT_OP,
          "#1f2328",
        ),
      });
      setStatus(
        `done — ${grid.cols}×${grid.rows} glyphs${fallback ? " · background removal unavailable; generated without it" : ""}`,
      );
    } catch (e) {
      if (v === version.current && alive.current)
        setStatus(e instanceof Error ? e.message : "Generation failed");
    } finally {
      if (v === version.current && alive.current) setBusy(false);
    }
  }
  function download(mode: "dark" | "light") {
    if (!svg) return;
    const url = URL.createObjectURL(
      new Blob([svg[mode]], { type: "image/svg+xml" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `hero-${mode}.svg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <Shell css={css} title={title}>
      <Page
        slots={{
          dropText: (
            <span id="dropText">
              {file ? "✓ " + file.name : "drop your photo here"}
              <br />
              <span className="text-xs">
                {file ? "click to change" : "or click to browse"}
              </span>
            </span>
          ),
          status: (
            <div id="status" className="status" role="status">
              {status}
            </div>
          ),
          stage: (
            <div id="stage" className={"stage " + theme}>
              {svg ? (
                <img
                  className="max-w-full"
                  alt="Portrait rendered in your tech stack"
                  src={
                    "data:image/svg+xml;charset=utf-8," +
                    encodeURIComponent(svg[theme])
                  }
                />
              ) : (
                <div className="empty">
                  <div className="big">░▒▓</div>upload a photo and hit generate
                </div>
              )}
            </div>
          ),
          snippet: svg ? (
            <pre id="snippet" className="snippet show">
              {"// README.md — put the SVGs in assets/\n" + snippet}
            </pre>
          ) : (
            <></>
          ),
        }}
        props={{
          drop: {
            className: "drop" + (over ? " over" : ""),
            onDragOver: (e: React.DragEvent) => {
              e.preventDefault();
              setOver(true);
            },
            onDragLeave: () => setOver(false),
            onDrop: (e: React.DragEvent) => {
              e.preventDefault();
              setOver(false);
              if (e.dataTransfer.files[0]) void choose(e.dataTransfer.files[0]);
            },
          },
          file: {
            disabled: busy,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.[0]) void choose(e.target.files[0]);
            },
          },
          stack: {
            value: words,
            defaultValue: undefined,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setWords(e.target.value),
          },
          bgRemove: {
            checked: remove,
            defaultChecked: undefined,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setRemove(e.target.checked),
          },
          cols: {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setCols(+e.target.value),
          },
          gamma: {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setGamma(+e.target.value),
          },
          cutoff: {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setCutoff(+e.target.value),
          },
          colsVal: { children: cols },
          gammaVal: { children: (gamma / 100).toFixed(2) },
          cutoffVal: { children: cutoff + "%" },
          go: { disabled: !image || busy, onClick: generate },
          tabDark: {
            className: "tab" + (theme === "dark" ? " on" : ""),
            onClick: () => setTheme("dark"),
          },
          tabLight: {
            className: "tab" + (theme === "light" ? " on" : ""),
            onClick: () => setTheme("light"),
          },
          actions: { style: { display: svg ? "flex" : "none" } },
          dlDark: { onClick: () => download("dark") },
          dlLight: { onClick: () => download("light") },
          copySnip: {
            onClick: () => {
              void navigator.clipboard
                .writeText(snippet)
                .then(() => setStatus("README snippet copied"))
                .catch(() =>
                  setStatus(
                    "Could not access clipboard. Select and copy the snippet below.",
                  ),
                );
            },
          },
        }}
      />
    </Shell>
  );
}
