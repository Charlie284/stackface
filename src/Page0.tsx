import { Link } from "react-router-dom";
import { asset, type TemplateProps } from "./shared";
export const css =
  "body {margin:0} .page {min-height:100vh;box-sizing:border-box;padding:8px} \n:root{\n  --bg:#0b0f14; --panel:#11161d; --panel2:#0e1319; --border:#1f2733;\n  --fg:#e6edf3; --dim:#8b949e; --faint:#57606a;\n  --green:#3fb950; --orange:#d29922; --blue:#58a6ff; --pink:#f778ba; --red:#f85149;\n  --mono:ui-monospace,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace;\n}\n*{box-sizing:border-box;margin:0;padding:0}\nhtml,.page{background:var(--bg);color:var(--fg);font-family:var(--mono);font-size:14px;line-height:1.55}\na{color:var(--blue);text-decoration:none}\na:hover{text-decoration:underline}\n.wrap{max-width:1200px;margin:0 auto;padding:28px 20px 60px}\n\n/* header */\nheader{margin-bottom:26px}\n.prompt{color:var(--green);font-weight:600}\n.h-title{font-size:clamp(22px,4vw,34px);font-weight:700;letter-spacing:-.5px;margin:6px 0 4px}\n.h-title .cursor{display:inline-block;width:.55em;height:1.05em;background:var(--green);vertical-align:-.15em;margin-left:6px;animation:blink 1.1s steps(1) infinite}\n@keyframes blink{50%{opacity:0}}\n.h-sub{color:var(--dim)}\n.h-sub b{color:var(--orange);font-weight:600}\n\n/* layout */\n.grid{display:grid;grid-template-columns:340px 1fr;gap:18px;align-items:start}\n@media(max-width:900px){.grid{grid-template-columns:1fr}}\n\n/* panels as terminal windows */\n.term{background:var(--panel);border:1px solid var(--border);border-radius:10px;overflow:hidden}\n.term-bar{display:flex;align-items:center;gap:8px;padding:9px 12px;background:var(--panel2);border-bottom:1px solid var(--border);color:var(--dim);font-size:12px}\n.dots{display:flex;gap:6px}\n.dot{width:10px;height:10px;border-radius:50%;background:#30363d}\n.dot:nth-child(1){background:#f8514966}.dot:nth-child(2){background:#d2992266}.dot:nth-child(3){background:#3fb95066}\n.term-.page{padding:16px}\n\n/* controls */\n.field{margin-bottom:16px}\n.label{display:block;color:var(--dim);font-size:12px;margin-bottom:6px}\n.label .k{color:var(--pink)}\ninput[type=text],textarea{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-family:var(--mono);font-size:13px;padding:8px 10px;outline:none}\ninput[type=text]:focus,textarea:focus{border-color:var(--blue)}\ntextarea{resize:vertical;min-height:64px}\n.drop{display:block;border:1.5px dashed var(--border);border-radius:8px;padding:18px 12px;text-align:center;color:var(--dim);cursor:pointer;transition:border-color .15s,background .15s}\n.drop:hover,.drop.over{border-color:var(--green);background:#3fb95010;color:var(--fg)}\n.drop input{display:none}\n.drop .file-ok{color:var(--green)}\n.row{display:flex;gap:10px;align-items:center}\n.row .grow{flex:1}\ninput[type=range]{width:100%;accent-color:var(--green)}\n.val{color:var(--orange);min-width:38px;text-align:right;font-size:12px}\n.check{display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--fg);user-select:none}\n.check input{accent-color:var(--green);width:15px;height:15px}\n.hint{color:var(--faint);font-size:11.5px;margin-top:5px}\n.btn{display:inline-flex;align-items:center;gap:7px;background:var(--green);color:#04110a;border:none;border-radius:6px;font-family:var(--mono);font-weight:700;font-size:13.5px;padding:10px 16px;cursor:pointer;width:100%;justify-content:center}\n.btn:hover{filter:brightness(1.1)}\n.btn:disabled{background:#2ea04366;color:#0b0f14;cursor:wait}\n.btn.ghost{background:transparent;color:var(--fg);border:1px solid var(--border);font-weight:600}\n.btn.ghost:hover{border-color:var(--dim);filter:none}\n.status{font-size:12px;color:var(--dim);margin-top:10px;min-height:16px}\n.status .ok{color:var(--green)} .status .err{color:var(--red)}\n\n/* preview */\n.tabs{display:flex;gap:2px;margin-left:auto}\n.tab{background:transparent;border:1px solid var(--border);color:var(--dim);font-family:var(--mono);font-size:12px;padding:4px 12px;cursor:pointer}\n.tab:first-child{border-radius:6px 0 0 6px}.tab:last-child{border-radius:0 6px 6px 0}\n.tab.on{background:var(--border);color:var(--fg)}\n.stage{min-height:420px;display:flex;align-items:center;justify-content:center;padding:22px;transition:background .2s}\n.stage.dark{background:#0d1117}.stage.light{background:#ffffff}\n.stage svg{max-width:100%;height:auto}\n.empty{color:var(--faint);text-align:center}\n.empty .big{font-size:40px;line-height:1;margin-bottom:10px}\n.actions{display:flex;flex-wrap:wrap;gap:10px;padding:14px 16px;border-top:1px solid var(--border)}\n.actions .btn{width:auto}\n.snippet{background:var(--bg);border-top:1px solid var(--border);padding:14px 16px;font-size:12px;color:var(--dim);white-space:pre-wrap;word-break:break-all;display:none}\n.snippet.show{display:block}\n.snippet .tag{color:var(--pink)} .snippet .attr{color:var(--orange)} .snippet .str{color:var(--blue)}\n\nfooter{margin-top:34px;color:var(--faint);font-size:12.5px;text-align:center}\nfooter a{color:var(--dim)}\n\ntext{font-family:${FONT};font-size:10px}";
export const title = "stackface — your face, rendered in your stack";
export default function Page0({ slots = {}, props = {} }: TemplateProps) {
  return (
    <>
      <div className={"wrap"}>
        <header>
          <div>
            <span className={"prompt"}>{"you@github"}</span>
            <span style={{ color: "var(--dim)" }}>{":"}</span>
            <span style={{ color: "var(--blue)" }}>{"~"}</span>
            <span style={{ color: "var(--dim)" }}>{"$"}</span>
            {" stackface --init"}
          </div>
          <h1 className={"h-title"}>
            {"stackface"}
            <span className={"cursor"}></span>
          </h1>
          <p className={"h-sub"}>
            {"your face, rendered in "}
            <b>{"your stack"}</b>
            {
              " — a GitHub-ready ASCII portrait, generated from a photo. 100% client-side: your photo never leaves this tab."
            }
          </p>
        </header>
        <div className={"grid"}>
          <div className={"term"}>
            <div className={"term-bar"}>
              <div className={"dots"}>
                <span className={"dot"}></span>
                <span className={"dot"}></span>
                <span className={"dot"}></span>
              </div>
              {"stackface.config"}
            </div>
            <div className={"term-body"}>
              <div className={"field"}>
                <label className={"label"}>
                  <span className={"k"}>{"photo:"}</span>
                  {" a clear, front-facing shot works best"}
                </label>
                <label className={"drop"} id={"drop"} {...props["drop"]}>
                  {(props["drop"]?.children as React.ReactNode) ?? (
                    <>
                      <input
                        type={"file"}
                        id={"file"}
                        accept={"image/*"}
                        {...props["file"]}
                      />
                      {slots["dropText"] ?? (
                        <span id={"dropText"}>
                          {"drop your photo here"}
                          <br />
                          <span
                            style={{
                              fontSize: "11.5px",
                              color: "var(--faint)",
                            }}
                          >
                            {"or click to browse"}
                          </span>
                        </span>
                      )}
                    </>
                  )}
                </label>
              </div>
              <div className={"field"}>
                <label className={"label"}>
                  <span className={"k"}>{"stack:"}</span>
                  {" the words your portrait is made of"}
                </label>
                <textarea
                  id={"stack"}
                  spellCheck={"false"}
                  defaultValue={
                    "python, react, nextjs, flask, django, aws, socketio, mysql, postgres, docker, redis, stripe, typescript, websockets, git, linux"
                  }
                  {...props["stack"]}
                >
                  {(props["stack"]?.children as React.ReactNode) ?? <></>}
                </textarea>
              </div>
              <div className={"field"}>
                <label className={"check"}>
                  <input
                    type={"checkbox"}
                    id={"bgRemove"}
                    defaultChecked={true}
                    {...props["bgRemove"]}
                  />
                  {" remove background (recommended)"}
                </label>
                <p className={"hint"}>
                  {
                    "runs a ~40 MB AI model in your browser, one-time download. uncheck if your photo already has a plain background."
                  }
                </p>
              </div>
              <div className={"field"}>
                <label className={"label"}>
                  <span className={"k"}>{"width:"}</span>
                  {" characters across "}
                  <span className={"hint"}>
                    {"(more = sharper, heavier file)"}
                  </span>
                </label>
                <div className={"row"}>
                  <input
                    type={"range"}
                    id={"cols"}
                    min={"48"}
                    max={"110"}
                    defaultValue={"78"}
                    className={"grow"}
                    {...props["cols"]}
                  />
                  <span className={"val"} id={"colsVal"} {...props["colsVal"]}>
                    {(props["colsVal"]?.children as React.ReactNode) ?? (
                      <>{"78"}</>
                    )}
                  </span>
                </div>
              </div>
              <div className={"field"}>
                <label className={"label"}>
                  <span className={"k"}>{"brightness:"}</span>
                  {" lift midtones if your photo is dark"}
                </label>
                <div className={"row"}>
                  <input
                    type={"range"}
                    id={"gamma"}
                    min={"50"}
                    max={"130"}
                    defaultValue={"85"}
                    className={"grow"}
                    {...props["gamma"]}
                  />
                  <span
                    className={"val"}
                    id={"gammaVal"}
                    {...props["gammaVal"]}
                  >
                    {(props["gammaVal"]?.children as React.ReactNode) ?? (
                      <>{"0.85"}</>
                    )}
                  </span>
                </div>
              </div>
              <div className={"field"}>
                <label className={"label"}>
                  <span className={"k"}>{"cutoff:"}</span>
                  {" hide near-invisible cells "}
                  <span className={"hint"}>
                    {"(only used when background removal is off)"}
                  </span>
                </label>
                <div className={"row"}>
                  <input
                    type={"range"}
                    id={"cutoff"}
                    min={"0"}
                    max={"40"}
                    defaultValue={"8"}
                    className={"grow"}
                    {...props["cutoff"]}
                  />
                  <span
                    className={"val"}
                    id={"cutoffVal"}
                    {...props["cutoffVal"]}
                  >
                    {(props["cutoffVal"]?.children as React.ReactNode) ?? (
                      <>{"8%"}</>
                    )}
                  </span>
                </div>
              </div>
              <button
                className={"btn"}
                id={"go"}
                disabled={true}
                {...props["go"]}
              >
                {(props["go"]?.children as React.ReactNode) ?? (
                  <>{"▸ generate portrait"}</>
                )}
              </button>
              {slots["status"] ?? (
                <div className={"status"} id={"status"}>
                  {"waiting for a photo…"}
                </div>
              )}
            </div>
          </div>

          <div className={"term"}>
            <div className={"term-bar"}>
              <div className={"dots"}>
                <span className={"dot"}></span>
                <span className={"dot"}></span>
                <span className={"dot"}></span>
              </div>
              {"\n      preview.svg\n      "}
              <div className={"tabs"}>
                <button
                  className={"tab on"}
                  id={"tabDark"}
                  {...props["tabDark"]}
                >
                  {(props["tabDark"]?.children as React.ReactNode) ?? (
                    <>{"dark"}</>
                  )}
                </button>
                <button
                  className={"tab"}
                  id={"tabLight"}
                  {...props["tabLight"]}
                >
                  {(props["tabLight"]?.children as React.ReactNode) ?? (
                    <>{"light"}</>
                  )}
                </button>
              </div>
            </div>
            {slots["stage"] ?? (
              <div className={"stage dark"} id={"stage"}>
                <div className={"empty"} id={"emptyMsg"}>
                  <div className={"big"}>{"░▒▓"}</div>
                  {"\n        upload a photo and hit "}
                  <span style={{ color: "var(--green)" }}>{"generate"}</span>
                  <br />
                  <span style={{ fontSize: "12px" }}>
                    {"your portrait renders here, exactly as it will on GitHub"}
                  </span>
                </div>
              </div>
            )}
            <div
              className={"actions"}
              id={"actions"}
              style={{ display: "none" }}
              {...props["actions"]}
            >
              {(props["actions"]?.children as React.ReactNode) ?? (
                <>
                  <button className={"btn"} id={"dlDark"} {...props["dlDark"]}>
                    {(props["dlDark"]?.children as React.ReactNode) ?? (
                      <>{"↓ hero-dark.svg"}</>
                    )}
                  </button>
                  <button
                    className={"btn ghost"}
                    id={"dlLight"}
                    {...props["dlLight"]}
                  >
                    {(props["dlLight"]?.children as React.ReactNode) ?? (
                      <>{"↓ hero-light.svg"}</>
                    )}
                  </button>
                  <button
                    className={"btn ghost"}
                    id={"copySnip"}
                    {...props["copySnip"]}
                  >
                    {(props["copySnip"]?.children as React.ReactNode) ?? (
                      <>{"⧉ copy README snippet"}</>
                    )}
                  </button>
                </>
              )}
            </div>
            {slots["snippet"] ?? (
              <div className={"snippet"} id={"snippet"}></div>
            )}
          </div>
        </div>
        <footer>
          {"\n  open source · "}
          <a
            href={"https://github.com/mittal-sahab-sudo/stackface"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            {"star it on GitHub"}
          </a>
          {" · built by "}
          <a
            href={"https://mittalsahab.com"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            {"Abhishek Mittal"}
          </a>
          {" — whose "}
          <a
            href={"https://github.com/mittal-sahab-sudo"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            {"README"}
          </a>
          {" started this\n"}
        </footer>
      </div>
    </>
  );
}
