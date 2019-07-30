import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.filterByCookingNow = false;
        this.filterByHistoricalOrders = false;
        this.searchText = '';
        this.toggleFilterByCookingNow = this.toggleFilterByCookingNow.bind(this);
    }

    toggleFilterByCookingNow = () => {
        this.filterByCookingNow = true;
        if(this.filterByCookingNow) {
            this.filterByHistoricalOrders = false;
            this.searchText = '';
        }
    }

    render() {
        return (
            <form className="searchBar">

                <label htmlFor="cooked">Get all cooked orders in past <input
                    type="text"
                    name="cooked"
                    readOnly
                    value={this.searchText}
                /> seconds</label>
                <p>
                    <input
                        type="checkbox"
                        name="cooking"
                        onChange={this.toggleFilterByCookingNow}

                    />
                    <label htmlFor="cooking"
                           name="cooking-label"
                    >
                        Orders currently cooking
                    </label>
                    <input
                        type="checkbox"
                        name="historical"
                        readOnly
                        checked={this.filterByHistoricalOrders}
                    />
                    <label htmlFor="historical"
                           name="historical-label"
                    >
                        All processed orders
                    </label>
                </p>
            </form>
        )
    }
}

export default SearchBar;