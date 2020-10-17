import React, { useState, useContext } from 'react';
import MainContext from "../Contexts/MainContext";
import './JobModal.scss';
import Modal from '../Modal/Modal';
import axios from "axios";

const JobModal = ({ actionType }) => {
    const {jobDispatch, selectedJob, close} = useContext(MainContext);
    const job = selectedJob;


    /*const [newJobId, setNewJobId] = useState(job.id);*/
    const [newJobName, setNewJobName] = useState(job.name);

    const changeName = event => setNewJobName(event.target.value);/// toma le valor del input entonces se lo pasa en NewUser
    /*  const changeJobId = event => setNewJobId(event.target.value); *//// toma el valor del select

    const save = () => {
        const newJob = {
            ...job,
            name: newJobName
        };

        axios.put(`https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs/${newJob.id}`, newJob)// newUser es lo que subimos a la api
            .then(res => {
                // const newList = [...jobs];
                // const jobIndex = newList.findIndex(j => j.id == job.id);
                jobDispatch({ type: actionType, payload: newJob });
                close();
            }).catch(err => alert("ERROR!"));
    }


    return (
        <Modal title={`Edit Job ${job.name}`} >
            <form>
                <input type="text" defaultValue={job.name} onChange={changeName} />
                <button type="button" onClick={save}>Save</button>
            </form>
        </Modal>
    )
}
export default JobModal;