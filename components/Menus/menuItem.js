import Link from "next/link"

function MenuItem(props){
    return(
        <Link href={`${props.linkLocation}`}>
        <a>
            {props.linkTitle}
        </a>
        </Link>
    )
}

export default MenuItem