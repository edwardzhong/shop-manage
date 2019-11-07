import React from 'react'
import './style.scss'

const Table =({column,data})=>{
    return <table styleName="table">
        <thead>
            <tr>
                {
                    column.map((c,i)=><th key={i}>{c.title}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((d,i)=>{
                    return <tr key={i}>{
                        column.map((c,j)=>{
                            const row = d[c.data];
                            return <td key={j}>{c.render?c.render(row):row}</td>
                        })
                    }
                    </tr>
                })
            }
        </tbody>
    </table>
}

export default Table