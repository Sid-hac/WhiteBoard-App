
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";


const Home = async () => {

  const session = await getServerSession(authOptions)

  return (
    <div className="flex justify-center items-center">

      {session ? <Link href='/api/auth/signout'>sign out</Link> : <Link href='/api/auth/signin'>sign In</Link>}
    </div>
  );
}

export default Home;
