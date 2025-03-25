export default function Home() {
  return (
    <div className="container-sm flex flex-col gap-4">
      <h1 className="text-3xl">Home</h1>
      <p className="pl-4">
        This is a Progressive Web Application, add to your home screen to make
        your life a bit easier. I put some steps below.
      </p>
      <p className="pl-4">
        You can currently start a round, add holes to that round, and then save
        it. You can add clubs to your bag to track distances that you always
        forget like me. You can also see previous rounds that you have saved.
      </p>
      <div className="pl-4">
        <p className="font-semibold underline">
          Currently lacking features to add soon:
        </p>
        <ol className="list-decimal pl-6">
          <li>
            You must finish a round (all 18 holes) to be able to save, you
            cannot save or delete mid round.
          </li>
          <li>
            You cannot go back and edit holes mid round or after a round has
            been saved.
          </li>
          <li>You cannot delete a round after it has been saved.</li>
          <li>You cannot edit or delete clubs from your bag.</li>
          <li>I&apos;m hoping to add some offline support soon as well</li>
        </ol>
        <p className="text-sm mt-4 italic">
          I&apos;ll do my best to keep this list updated as I encounter issues.
        </p>
      </div>
      <h3 className="text-2xl">How to add a PWA to home screen</h3>
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
      </div>
    </div>
  );
}
