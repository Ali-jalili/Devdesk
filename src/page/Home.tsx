/** @format */

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const requests = [
  {
    method: "GET",
    endpoint: "/api/products",
    url: "https://api.example.com/products",
    status: "200 OK",
    statusColor: "text-emerald-600",
    methodColor: "text-emerald-600",
  },
  {
    method: "POST",
    endpoint: "/api/auth/login",
    url: "https://api.example.com/auth/login",
    status: "201 Created",
    statusColor: "text-emerald-600",
    methodColor: "text-blue-600",
  },
  {
    method: "GET",
    endpoint: "/api/users/:id",
    url: "https://api.example.com/users/42",
    status: "200 OK",
    statusColor: "text-emerald-600",
    methodColor: "text-emerald-600",
  },
];

const features = [
  {
    title: "Workspaces",
    description:
      "Keep every project and its API context organized in its own workspace.",
    icon: "W",
  },
  {
    title: "Collections",
    description:
      "Group related API requests into meaningful collections that match your project.",
    icon: "C",
  },
  {
    title: "Requests",
    description:
      "Keep endpoints, methods, headers, parameters, and documentation together.",
    icon: "R",
  },
  {
    title: "Environments",
    description:
      "Manage environment-specific values like base URLs and tokens in one place.",
    icon: "E",
  },
];

const workflow = [
  {
    number: "01",
    title: "Create a Workspace",
    description:
      "Start with a focused space for your project and its API ecosystem.",
  },
  {
    number: "02",
    title: "Organize Collections",
    description:
      "Group related endpoints into collections that make sense for your project.",
  },
  {
    number: "03",
    title: "Manage Requests",
    description: "Keep every request and its surrounding context together.",
  },
];

export default function Home() {
  const [requestIndex, setRequestIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestIndex((current) => (current + 1) % requests.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const request = requests[requestIndex];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= HERO ================= */}

      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Hero Content */}

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
            Developer workflow, simplified
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            Your API workflow,
            <span className="block text-indigo-600">organized.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Keep your API requests, collections, environments, and documentation
            organized in one focused workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <NavLink
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20"
            >
              Get Started
              <span className="ml-2">→</span>
            </NavLink>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
            >
              Explore DevDesk
            </a>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Built for developers who want their API context in one place.
          </p>
        </div>

        {/* ================= PRODUCT PREVIEW ================= */}

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
            {/* Window Header */}

            <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
              </div>

              <span className="text-xs font-medium text-slate-400">
                DevDesk
              </span>

              <div className="w-8" />
            </div>

            <div className="grid min-h-[400px] grid-cols-[145px_1fr]">
              {/* Sidebar */}

              <aside className="border-r border-slate-200 bg-slate-50/70 p-3">
                <div className="mb-7 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-sm shadow-indigo-600/20">
                  D
                </div>

                <div className="space-y-1 text-xs">
                  <div className="rounded-md bg-indigo-50 px-2.5 py-2 font-medium text-indigo-600">
                    Dashboard
                  </div>

                  <div className="px-2.5 py-2 text-slate-500">Workspaces</div>

                  <div className="px-2.5 py-2 text-slate-500">Collections</div>

                  <div className="px-2.5 py-2 text-slate-500">Requests</div>

                  <div className="px-2.5 py-2 text-slate-500">Environments</div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-4">
                  <div className="px-2.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Workspace
                  </div>

                  <div className="mt-2 flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    E-Commerce API
                  </div>
                </div>
              </aside>

              {/* Preview Content */}

              <div className="min-w-0 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Workspace</p>

                    <h3 className="mt-1 text-sm font-semibold text-slate-900">
                      E-Commerce API
                    </h3>
                  </div>

                  <button className="rounded-md bg-indigo-600 px-3 py-2 text-[10px] font-semibold text-white shadow-sm shadow-indigo-600/20">
                    + New Request
                  </button>
                </div>

                {/* Stats */}

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-[9px] text-slate-400">Collections</p>

                    <p className="mt-1 text-lg font-semibold">8</p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-[9px] text-slate-400">Requests</p>

                    <p className="mt-1 text-lg font-semibold">42</p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-[9px] text-slate-400">Environments</p>

                    <p className="mt-1 text-lg font-semibold">3</p>
                  </div>
                </div>

                {/* Animated Request */}

                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                    <span
                      key={request.method}
                      className={`animate-pulse rounded bg-slate-50 px-1.5 py-0.5 font-mono text-[9px] font-bold ${request.methodColor}`}
                    >
                      {request.method}
                    </span>

                    <span
                      key={request.endpoint}
                      className="truncate font-mono text-[10px] text-slate-600"
                    >
                      {request.endpoint}
                    </span>

                    <span
                      key={request.status}
                      className={`ml-auto flex items-center gap-1.5 text-[9px] ${request.statusColor}`}
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      {request.status}
                    </span>
                  </div>

                  <div className="space-y-2 p-4 font-mono text-[9px]">
                    <div className="flex gap-3">
                      <span className="text-slate-300">01</span>

                      <span className="truncate text-slate-500">
                        {request.url}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-slate-300">02</span>

                      <span className="text-slate-500">
                        Authorization: Bearer ••••••••
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-slate-300">03</span>

                      <span className="text-indigo-500">
                        Content-Type: application/json
                      </span>
                    </div>
                  </div>

                  {/* Activity bar */}

                  <div className="border-t border-slate-200 bg-white px-4 py-3">
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="text-slate-400">Sending request...</span>

                      <span className="text-emerald-600">Connected</span>
                    </div>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        key={requestIndex}
                        className="h-full w-full origin-left animate-[grow_3s_ease-in-out]"
                        style={{
                          backgroundColor: "#6366f1",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Activity */}

                <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-[9px] text-slate-400">Recent activity</p>

                    <p className="mt-1 text-[10px] font-medium text-slate-700">
                      Authentication collection updated
                    </p>
                  </div>

                  <span className="text-[9px] text-slate-400">just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card */}

          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                ✓
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-800">
                  API context ready
                </p>

                <p className="mt-0.5 text-[9px] text-slate-400">
                  Everything is organized
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section id="features" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-indigo-600">
              Everything in context
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Stop searching.
              <br />
              Start building.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              DevDesk keeps the information you need while working with APIs
              close to where you actually use it.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="mt-5 font-semibold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-indigo-600">
              Simple workflow
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              From project to request.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Organize your API workflow without losing the context behind it.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {workflow.map((step) => (
              <div key={step.number}>
                <span className="font-mono text-sm font-semibold text-indigo-600">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-16 text-center sm:px-10">
          <span className="text-sm font-semibold text-indigo-600">
            Ready to get organized?
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Build with context, not clutter.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Create your first workspace and bring your API workflow together.
          </p>

          <NavLink
            to="/signup"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20"
          >
            Create your workspace
          </NavLink>
        </div>
      </section>
    </main>
  );
}
