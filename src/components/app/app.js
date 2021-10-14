import {Component} from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import './app.css';





class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [
                {name: "John Smith" , salary: 800, increase: true, rise: true, id: 1 },
                {name: "Paul Baker" , salary: 2000, increase: false, rise: false, id: 2 },
                {name: "Frank Goldman" , salary: 10000000, increase: false,rise: false, id: 3 },
                {name: "Gared Plane" , salary: 1200, increase: false,rise: false, id: 4 }
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }
    /*Server data*/
    
    deleteItem = (id) => {
        this.setState(({data}) => ({
            data: data.filter(item => item.id !== id) 
        }))
    }
    
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: ++this.maxId
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }
    
    // onToggleIncrease = (id) => {
    //     this.setState(({data}) => {
    //         const index = data.findIndex(elem => elem.id === id);
            
    //         const old = data[index];
    //         const newItem = {...old, increase: !old.increase};
    //         const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
    //         return {
    //             data: newArr
    //         }
    //     })
    // }
    
    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                
                return item;
            })
        }))
    }
    
    
    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                
                return item;
            })
        }))
    }
    
    
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
        
    }
    
    onUpdateSearch = (term) => {
        this.setState({term});
    }
    
    
    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
                
        }
    }


    onFilterSelect = (filter) => {
        this.setState({filter});
    }
    
    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increasedEmployees = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        
        return (
            <div className="app">
                <AppInfo employees={employees}
                         increasedEmployees={increasedEmployees}
                />
                
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}    
                    />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}  
                    onToggleRise={this.onToggleRise}
                    onToggleIncrease={this.onToggleIncrease}
                />
                <EmployeesAddForm onAdd = {this.addItem}/>
            </div>
        )
    }
}

export default App;