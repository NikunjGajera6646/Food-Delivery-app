import React from 'react'

const ProductModal = ({ id1, comments }) => {
    console.log(comments);

    return (
        <div className="modal fade" id={id1} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            comments.map((data) => {
                                return (
                                    <div key={data._id}>
                                        <h5> {data.commenttext}</h5><hr></hr>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductModal
