"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WEBR_URL = "https://webr.r-wasm.org/v0.5.5/webr.mjs";

type WebRModule = {
  WebR: new (options?: { channelType?: string }) => WebRSession;
};

type WebRSession = {
  init: () => Promise<void>;
  destroy: () => Promise<void>;
  Shelter: new () => Shelter;
};

type CaptureLine = { type?: string; data?: unknown };

type Shelter = {
  captureR: (
    code: string,
    options?: {
      withAutoprint?: boolean;
      captureStreams?: boolean;
      captureConditions?: boolean;
      captureGraphics?: { width: number; height: number };
    },
  ) => Promise<{ output?: CaptureLine[]; images?: ImageBitmap[] }>;
  purge: () => Promise<void>;
};

function printedText(output: CaptureLine[] | undefined): string {
  return (output ?? [])
    .filter((line) => line.type === "stdout" || line.type === "stderr")
    .map((line) => (typeof line.data === "string" ? line.data : ""))
    .join("")
    .trim();
}

declare global {
  var __reticulumWebR: WebRModule["WebR"] | undefined;
}

async function bitmapToPng(bitmap: ImageBitmap): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvas.toDataURL("image/png");
}

function readCode(): string {
  const hash = window.location.hash;
  if (!hash.startsWith("#code=")) return "";
  const encoded = hash.slice("#code=".length);
  try {
    return decodeURIComponent(encoded);
  } catch {
    return encoded;
  }
}

function loadWebR(): Promise<WebRModule["WebR"]> {
  if (globalThis.__reticulumWebR) return Promise.resolve(globalThis.__reticulumWebR);
  return new Promise((resolve, reject) => {
    const finish = () => {
      if (globalThis.__reticulumWebR) resolve(globalThis.__reticulumWebR);
      else reject(new Error("R did not become available."));
    };
    window.addEventListener("reticulum-webr", finish, { once: true });
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { WebR } from ${JSON.stringify(WEBR_URL)};
      globalThis.__reticulumWebR = WebR;
      globalThis.dispatchEvent(new Event("reticulum-webr"));
    `;
    script.onerror = () => reject(new Error("The R runtime could not be downloaded."));
    document.head.appendChild(script);
  });
}

export function Playground() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Starting R in this browser…");
  const [plots, setPlots] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const source = readCode();
    setCode(source);
    let cancelled = false;
    let session: WebRSession | undefined;

    loadWebR()
      .then(async (WebR) => {
        session = new WebR({ channelType: "post-message" });
        await session.init();
        if (cancelled) return;
        if (!source.trim()) {
          setOutput("No program was attached. Open Try it from a lesson.");
          return;
        }
        const shelter = await new session.Shelter();
        try {
          const result = await shelter.captureR(source, {
            withAutoprint: true,
            captureStreams: true,
            captureConditions: true,
            captureGraphics: { width: 720, height: 420 },
          });
          const text = printedText(result.output);
          const images = (await Promise.all((result.images ?? []).map(bitmapToPng))).filter(Boolean);
          if (!cancelled) {
            setPlots(images);
            setOutput(text || (images.length > 0 ? "" : "(no output)"));
          }
        } finally {
          await shelter.purge();
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setFailed(true);
        setOutput(error instanceof Error ? error.message : "R could not start.");
      });

    return () => {
      cancelled = true;
      void session?.destroy();
    };
  }, []);

  return (
    <div className="site-wrap space-y-6 py-8 sm:py-12">
      <section className="panel px-5 py-8 sm:px-8">
        <p className="eyebrow">Try it</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">R, in this browser</h1>
        <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
          The first visit downloads R from the WebR project and runs the lesson here. Nothing is sent to
          Reticulum, and nothing is stored.
        </p>
        <Link href="/" className="btn-ghost mt-6">
          Back to the lessons
        </Link>
      </section>
      <section className="panel px-5 py-5 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight">Program</h2>
        <pre className="py-block">
          <code>{code || "Open Try it from a lesson to load a program."}</code>
        </pre>
        <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight">Result</h2>
        {output ? (
          <pre className={failed ? "py-block verdict-bad" : "py-block"}>
            <code>{output}</code>
          </pre>
        ) : null}
        {plots.map((src, index) => (
          // The plot is a data URL produced in the browser, so it is not a static image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={src}
            alt="Plot drawn by the program"
            className="mt-3 max-w-full rounded-md border border-[var(--line)] bg-white"
          />
        ))}
      </section>
    </div>
  );
}
