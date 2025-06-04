
import SignInButton from "../components/SignInButton";

export default async function Home() {
  
  return (
    <>
      <div className="w-full min-h-screen">
        <section className="flex flex-col items-center justify-center mt-20 gap-6 text-center">
          <h1 className="text-[23px] md:text-[40px] font-bold">
            Welcome to Xorithm Status
          </h1>
          <p className="text-[18px] md:text-[22px] text-gray-600">
            Log in to view your dashboard
          </p>
          <SignInButton />
        </section>
      </div>
    </>
  );
}
