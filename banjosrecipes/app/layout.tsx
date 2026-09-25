import "./globals.css"
import Link from "next/link"
import { Icon } from "@/components/Icon"
export const metadata = { title: "Danjo Recipes · The recipe notebook", description: "A personal collection of recipes, from everyday favourites to something sweet." }
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><header className="header"><div className="headerInner"><Link href="/" className="brand"><Icon className="brandMark"/>Danjo<span className="brandLight">Recipes</span></Link><nav aria-label="Main navigation"><Link href="/recipes">The collection <Icon name="arrow"/></Link></nav><span className="headerNote">A LITTLE INSPIRATION FOR THE EVERYDAY</span></div></header>{children}<footer><Link className="brand" href="/">Danjo Recipes</Link><span>Good food. Kept close.</span><Link href="/admin" className="ownerLink">Owner sign-in</Link><span>THE PERSONAL RECIPE NOTEBOOK</span></footer></body></html>}
