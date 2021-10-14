import './app-filter.css';

const AppFilter = ({filter, onFilterSelect}) => {
    const btnsData = [
        {name: 'all', label: 'Все сотрудники'}, 
        {name: 'rise', label: 'На повышение'},  
        {name: 'moreThan1000', label: 'З/П больше 1000$'}    
    ];
    
    const btns = btnsData.map(({name, label}) => {
        const active = filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button 
                className={`btn ${clazz}`} 
                key={name}
                type="button"
                onClick={()=>onFilterSelect(name)}    
            >
                {label}
            </button>        
        )
    })
    
    return (
        <div className="btn-group">
            {btns}
        </div>
    )
}

export default AppFilter;