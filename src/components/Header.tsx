import { CedarLogo } from "./CedarLogo";

export function Header() {
  return (
    <header className="flex flex-col items-center gap-2 pt-10 pb-6 px-4 text-center">
      <div className="flex items-center gap-3">
        <CedarLogo className="h-10 w-10 text-cedar-700" />
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cedar-800">
          Cedar Bites
        </h1>
      </div>
      <p className="text-sm sm:text-base text-cedar-900/70 max-w-md text-balance">
        Vote for Lebanon&apos;s favorite dish and watch the results live.
      </p>
      <div className="mt-1 h-1.5 w-24 rounded-full flag-stripe" />
    </header>
  );
}
