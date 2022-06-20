import React from 'react'
import { Link } from 'react-router-dom';

export default class MyJobs extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div class="content-section">
                    <div class="work-section job-section">
                        <div class="container">
                            <div class="work-section-inner">
                                <h2>Services </h2>
                            </div>
                        </div>
                    </div>
                    <div class="jobs-table">
                        <div class="container">

                            <h1>My Admin Jobs </h1>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Title </th>
                                            <th>Date Submitted</th>
                                            <th>Desc.</th>
                                            <th>Start Date </th>
                                            <th>Status </th>
                                            <th>Est Complete Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td><a href="#">Beacon PCBA </a></td>
                                            <td>12/1/19</td>
                                            <td>4L PCB Fab and Assembly</td>
                                            <td>12/10/19</td>
                                            <td><form>

                                                <select>
                                                    <option value="In Review">In Review</option>
                                                    <option value="In Review">In Review</option>
                                                    <option value="In Review">In Review</option>
                                                    <option value="In Review">In Review</option>
                                                </select>
                                            </form></td>
                                            <td>1/1/20</td>


                                        </tr>

                                        <tr>

                                            <td><a href="#">Beacon Case </a></td>
                                            <td>12/16/19</td>
                                            <td>4L PCB Fab and Assembly</td>
                                            <td>12/17/19</td>
                                            <td><form>

                                                <select>
                                                    <option value="In Review">In Review</option>
                                                    <option value="In Review">In Review</option>
                                                    <option value="In Review">In Review</option>
                                                    <option value="In Review">In Review</option>
                                                </select>
                                            </form></td>
                                            <td>12/27/20</td>
                                        </tr>                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}