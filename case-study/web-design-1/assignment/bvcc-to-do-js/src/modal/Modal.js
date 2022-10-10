import React, { useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import styles from "./Modal.module.css";

/** @typedef {import("../types/types").ToDoListItem} ToDoListItem */

/**
 * @callback UpdateItemCallback
 * @param {ToDoListItem} item - The updated item.
 * @return {void}
 */

/**
 * @typedef {Object} Props
 * @property {ToDoListItem} item - An item.
 * @property {UpdateItemCallback} updateItem - A callback that updates the item.
 */

/**
 * Creates a component that represents a to-do list item.
 * @param {Props} props - The properties 
 */

const Modal = ({ openModal, setOpenModal, handleSubmit, handleChange, item }) => {

    return (
        <div
            className={styles.modal_root}
            style={openModal ? { display: "block" } : { display: "none" }}
        >
            <div className={styles.modal_root__overlay}></div>
            <div className={styles.modal_root__wrap}>
                <div className={styles.modal_root__wrap__modal}>
                    <div>
                        <h1 className={styles.modal_header}>{item.title}</h1>
                        <form className={`${styles.modal_content}`} onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="distance" className={`${styles.modal_form_label} form-label`}>Distance(mi):</label>
                                <input type="number" className={`${styles.modal_form_control} form-control`} id="distance" name='distance' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="duration" className={`${styles.modal_form_label} form-label`}>Duration(min):</label>
                                <input type="number" className={`${styles.modal_form_control} form-control`} id="duration" name='duration' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ask" className={`${styles.modal_form_label} form-label`}>Ask ($):</label>
                                <input type="number" className={`${styles.modal_form_control} form-control`} id="ask" name='ask' onChange={handleChange} />
                            </div>
                            <div className={styles.modal_btns}>
                                <button className={`${styles.modal_complete} btn btn`} type="submit">Complete</button>
                                <button type="reset" className={`${styles.modal_cancel} btn btn`} onClick={() => setOpenModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
