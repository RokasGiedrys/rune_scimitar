import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
const Navbar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/' className='flex flex-row space-x-4 items-center'>
          <Image src='/logo.png' alt='logo' width={35} height={35} />
          <h2 className='text-15-bold'>Rune Scimitar</h2>
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href='/post/create'>
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className='size-6 sm:hidden text-green-500' />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type='submit'>
                  <span className='max-sm:hidden'>Sign Out</span>
                  <LogOut className='size-6 sm:hidden text-red-500' />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className='size-10'>
                  <AvatarImage
                    src={session?.user?.image || "https://placehold.co/64x64"}
                    alt={`avatar of ${session?.user?.name}` || ""}
                  />
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type='submit'>Sign In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
