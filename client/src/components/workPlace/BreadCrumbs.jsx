import { Breadcrumb } from "react-bootstrap"


const BreadCrumbs = () => {
    return(
        <>
        <div className="container">
            <Breadcrumb>
                <Breadcrumb.Item href="#">my-drive</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Folder1
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
            </div>
        </>
    )
}

export { BreadCrumbs }