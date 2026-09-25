type IconName = "spark" | "bowl" | "soup" | "dessert" | "arrow" | "back" | "search" | "star" | "moon"
export function Icon({name="spark",className=""}:{name?:IconName;className?:string}) {
 return <svg className={`icon ${className}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
  {name==="spark"&&<path d="M24 5v38M5 24h38M11 11l26 26M11 37l26-26"/>}
  {name==="bowl"&&<><path d="M5 24a19 19 0 0 0 38 0H5ZM9 20a15 15 0 0 1 30 0M24 2v3"/><path d="M8 28h32"/></>}
  {name==="soup"&&<><path d="M5 25h38a19 19 0 0 1-38 0ZM15 19c-7-6 7-8 0-14M25 19c-7-6 7-8 0-14M35 19c-7-6 7-8 0-14M15 44h18"/></>}
  {name==="dessert"&&<><path d="m10 25 4 18h20l4-18ZM10 25C2 20 9 12 16 14c-1-14 18-14 17 0 9-2 14 8 5 11H10ZM20 30v8M28 30v8"/></>}
  {name==="arrow"&&<path d="M12 36 36 12M12 12h24v24"/>}
  {name==="back"&&<path d="M39 24H9m13-13L9 24l13 13"/>}
  {name==="search"&&<><circle cx="21" cy="21" r="13"/><path d="m31 31 11 11"/></>}
  {name==="moon"&&<path d="M40 29A18 18 0 0 1 19 6a18 18 0 1 0 21 23Z"/>}
  {name==="star"&&<path d="m24 5 6 12 13 2-10 10 2 14-11-7-12 7 3-14L5 19l13-2Z"/>}
 </svg>
}
export function CategoryIcon({category}:{category:string}) {
 return <Icon name={category==="Mains"?"bowl":category==="Soups"?"soup":category==="Desserts"?"dessert":"spark"}/>
}
