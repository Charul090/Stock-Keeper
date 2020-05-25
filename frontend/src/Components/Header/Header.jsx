import React from 'react'
import { useLocation, useHistory } from "react-router-dom"
import { GiBookshelf } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io"
import { IconContext } from "react-icons";
import styles from "./Header.module.css"

export default function Header() {

    let { pathname } = useLocation()
    let history = useHistory()

    const handleBack=()=>{
        history.goBack()
    }


    return (
        <header className={styles.header}>
            <div className={styles.container2}>
                {pathname === "/" ? null :
                    <IconContext.Provider value={{ className: styles.icon2 }}>
                        <div>
                            <IoMdArrowRoundBack onClick={handleBack}/>
                        </div>
                    </IconContext.Provider>}
            </div>
            <div>
                <IconContext.Provider value={{ className: styles.icon }}>
                    <div className={styles.logo}>
                        <GiBookshelf />
                        <h3>BookKeeper</h3>
                    </div>
                </IconContext.Provider>
            </div>
            <div></div>
        </header>
    )
}
