export default function Home() {
  return (
    <div className="container-sm flex flex-col gap-4">
      <h1 className="text-3xl">Home</h1>
      <p className="pl-4 mb-1">
        This is a Progressive Web Application, download for offline use to make
        your life a bit easier. I put some steps below.
      </p>
      <p className="pl-4 mb-1">
        You can currently update your current round, and add clubs to your bag
        to track distances that you always forget like me.
      </p>
      <h2 className="text-2xl">How to install PWA</h2>
      <div className="pl-4">
        <p className="underline font-semibold">On Chrome:</p>
        <ol className="list-decimal pl-6">
          <li>Open Chrome on your device.</li>
          <li>Navigate to the website you want to install as a PWA.</li>
          <li>
            Click on the three-dot menu icon in the top-right corner of the
            browser.
          </li>
          <li>Select &quot;Install [App Name]&quot; from the menu.</li>
          <li>
            Follow the on-screen instructions to complete the installation.
          </li>
        </ol>

        <p className="underline font-semibold">On Firefox:</p>
        <ol className="list-decimal pl-6">
          <li>Open Firefox on your device.</li>
          <li>Navigate to the website you want to install as a PWA.</li>
          <li>
            Click on the three-line menu icon in the top-right corner of the
            browser.
          </li>
          <li>Select &quot;Install&quot; from the menu.</li>
          <li>
            Follow the on-screen instructions to complete the installation.
          </li>
        </ol>

        <p className="underline font-semibold">On Safari:</p>
        <ol className="list-decimal pl-6">
          <li>Open Safari on your device.</li>
          <li>Navigate to the website you want to install as a PWA.</li>
          <li>Tap the &quot;Share&quot; button at the bottom of the screen.</li>
          <li>Scroll down and tap &quot;Add to Home Screen.&quot;</li>
          <li>
            Follow the on-screen instructions to complete the installation.
          </li>
        </ol>
      </div>
    </div>
  );
}
