

class ProductItem extends React.Component {

    render() {

        const {
            item,
            setStateModal
        } = this.props;

        return (

            <div className="col-lg-4 col-md-6 mb-4">

                <div className="card product-card h-100">


                    {/* Hình sản phẩm */}

                    <img
                        src={item.image}
                        className="card-img-top product-image"
                        alt={item.name}
                    />


                    {/* Nội dung */}

                    <div className="card-body">

                        <h5 className="card-title">
                            {item.name}
                        </h5>

                        <p className="card-text">
                            {item.price} $
                        </p>


                        <button
                            className="btn btn-dark btn-sm"
                            onClick={() => setStateModal(item)}
                        >
                            Add to cart
                        </button>

                    </div>

                </div>

            </div>
        );
    }
}





class ProductList extends React.Component {

    render() {

        const {
            productsData,
            setStateModal
        } = this.props;


        return (

            <div className="row">

                {
                    productsData.map((product) => (

                        <ProductItem
                            key={product.id}
                            item={product}
                            setStateModal={setStateModal}
                        />

                    ))
                }

            </div>
        );
    }
}





class Modal extends React.Component {

    render() {

        const {
            content
        } = this.props;


        if (!content) {
            return null;
        }


        return (

            <div
                className="modal fade"
                id="productModal"
                tabIndex="-1"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">


                        {/* HEADER */}

                        <div className="modal-header">

                            <h5 className="modal-title">
                                {content.name}
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            >
                            </button>

                        </div>


                        {/* BODY */}

                        <div className="modal-body">

                            <div className="row">


                                {/* Hình */}

                                <div className="col-md-6 text-center">

                                    <img
                                        src={content.image}
                                        alt={content.name}
                                        className="img-fluid modal-image"
                                    />

                                </div>


                                {/* Thông tin */}

                                <div className="col-md-6">

                                    <h4>
                                        {content.name}
                                    </h4>


                                    <p>
                                        <strong>
                                            Giá:
                                        </strong>

                                        <span className="text-danger ms-2">
                                            {content.price} $
                                        </span>
                                    </p>


                                    <p>
                                        <strong>
                                            Mô tả:
                                        </strong>
                                    </p>

                                    <p>
                                        {content.description}
                                    </p>


                                    <p>
                                        <strong>
                                            Mô tả ngắn:
                                        </strong>
                                    </p>

                                    <p>
                                        {content.shortDescription}
                                    </p>


                                    <p>
                                        <strong>
                                            Số lượng:
                                        </strong>

                                        <span className="ms-2">
                                            {content.quantity}
                                        </span>
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Đóng
                            </button>

                            <button
                                type="button"
                                className="btn btn-dark"
                            >
                                Thêm vào giỏ
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}





class ShoesStore extends React.Component {

    state = {

        
        products: [],

        
        productDetail: null

    };


    

    componentDidMount() {

        fetch("./data.json")

            .then(response => response.json())

            .then(data => {

                this.setState({

                    products: data

                });

            })

            .catch(error => {

                console.log(
                    "Lỗi lấy dữ liệu:",
                    error
                );

            });
    }


    

    setStateModal = (product) => {

        this.setState({

            productDetail: product

        }, () => {

            const modalElement =
                document.getElementById(
                    "productModal"
                );


            const modal =
                new bootstrap.Modal(
                    modalElement
                );


            modal.show();

        });

    };


    

    render() {

        return (

            <div>


                {/* ======================================
                    NAVBAR
                ====================================== */}

                <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">

                    <div className="container">


                        <a
                            className="navbar-brand"
                            href="#"
                        >
                            Shoes shop
                        </a>


                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >

                            <span className="navbar-toggler-icon"></span>

                        </button>


                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >

                            <ul className="navbar-nav ms-auto">

                                <li className="nav-item">

                                    <a
                                        className="nav-link"
                                        href="#"
                                    >
                                        Home
                                    </a>

                                </li>


                                <li className="nav-item">

                                    <a
                                        className="nav-link"
                                        href="#"
                                    >
                                        Shop
                                    </a>

                                </li>

                            </ul>

                        </div>

                    </div>

                </nav>



                {/* ======================================
                    SHOP
                ====================================== */}

                <div className="container">


                    <h2 className="shop-title">
                        Shoes shop
                    </h2>


                    <ProductList
                        productsData={this.state.products}
                        setStateModal={this.setStateModal}
                    />


                </div>



                {/* ======================================
                    MODAL
                ====================================== */}

                <Modal
                    content={this.state.productDetail}
                />

            </div>
        );
    }
}





const root = ReactDOM.createRoot(
    document.getElementById("root")
);


root.render(
    <ShoesStore />
);