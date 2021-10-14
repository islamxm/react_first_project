import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css';


const EmployeesList = ({data, onDelete, onToggleRise, onToggleIncrease}) => {
    
    const dataList = data.map(item => {
        return (
            <EmployeesListItem 
                key={item.id} 
                name={item.name} 
                salary={item.salary} 
                increase={item.increase}
                rise={item.rise}
                onDelete={() => onDelete(item.id)}
                onToggleRise={() => onToggleRise(item.id)}
                onToggleIncrease={() => onToggleIncrease(item.id)}
            />
        )    
    })
    
    
    return (
        <ul className="app-list list-group">
            {dataList}
        </ul>
    )
}

export default EmployeesList;