import AuthComponent from "./components/AuthComponent";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between align-center md:p-24 p-1 min-w-fit">
            <AuthComponent />
        </main>
    );
}
