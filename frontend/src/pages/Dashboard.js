import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { getStudentsByDay, getStudentSkills, getStudentCourses } from '../lib/api.js';
import { parseErrorMessage } from '../lib/utils.js';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [studentsByDay, setStudentsByDay] = useState([]);
    const [studentSkills, setStudentSkills] = useState([]);
    const [studentCourses, setStudentCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                let response = {}
                response.studentsByDay = await getStudentsByDay();
                response.studentSkills = await getStudentSkills();
                response.studentCourses = await getStudentCourses();
                setStudentsByDay(response.studentsByDay.data);
                setStudentSkills(response.studentSkills.data);
                setStudentCourses(response.studentCourses.data);
            }
            catch (error) {
                setErrorMessage(parseErrorMessage(error.response.data));
            }
            setIsLoading(false);
        })();
    }, [])

    return (
        <main>
            {errorMessage &&
                <>
                    <div className='error'>
                        Unable to load the dashboard due to the following server error:
                        <br />
                        {errorMessage}
                    </div>
                    <br />
                    <br />
                </>
            }
            {!errorMessage &&
                <>
                    <LineChart
                        data={studentsByDay}
                        width={600} height={250}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="number" stroke="#8884d8" name='Number of created students' />
                    </LineChart>

                    <RadarChart
                        data={studentSkills}
                        cx={300} cy={250}
                        outerRadius={170}
                        width={600} height={500}
                    >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} />
                        <Radar name="Existing skills" dataKey="num_existing" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Desired skills" dataKey="num_desired" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Legend />
                    </RadarChart>

                    <PieChart width={600} height={400}>
                        <Pie
                            data={studentCourses}
                            dataKey="count"
                            cx={300} cy={200}
                            innerRadius={65} outerRadius={100}
                            paddingAngle={4}
                            label
                        >
                            {
                                studentCourses.map((entry, index) =>
                                    <Cell
                                        key={`cell-${index}`}
                                        name={entry.course}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                )
                            }
                        </Pie>
                        <Legend />
                    </PieChart>
                </>
            }
        </main>
    );
}

export default Dashboard;
