import styles from './Loading.module.scss'

function Loading(){
    return <div className="d-flex flex-row align-items-center justify-content-center flex-fill">
        <i className={` ${styles.spinner} fa-solid fa-spinner`}></i>
    </div>
}

export default Loading;