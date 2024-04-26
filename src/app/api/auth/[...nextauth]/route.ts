import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CreadentialProvider from "next-auth/providers/credentials"

const authOptions: AuthOptions = {

    providers: [

        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CreadentialProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter Username" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" }
            },
            async authorize(credentials, req) {

                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })


                // const user = await res.json()

                // // If no error and we have user data, return it
                // if (res.ok && user) {
                //     return user
                // }
                // // Return null if user data could not be retrieved
                return null
            },
        }),
    ],
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    },
    callbacks : {
        async redirect(){
              return '/whiteboard'
        }
    }

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }