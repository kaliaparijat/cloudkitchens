import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.filterByCookingNow = false;
        this.filterByHistoricalOrders = true;
    }

    searchByCookingNow() {
        this.filterByCookingNow = !this.filterByCookingNow;
    }

    showAllHistoricalOrders() {
        this.filterByHistoricalOrders = !this.filterByHistoricalOrders;
    }

    render() {
        const { filterByCookingNow, showAllHistoricalOrders } = this;
        return (
            <form className="searchBar">

                <label htmlFor="cooked">Get all cooked orders in past <input
                    type="text"
                    name="cooked"
                /> seconds</label>
                <p>
                    <input
                        type="checkbox"
                        name="cooking"
                        onChange={this.searchByCookingNow.bind(this)}
                        checked={this.filterByCookingNow}
                    />
                    <label htmlFor="cooking"
                           name="cooking-label"
                    >
                        Orders currently cooking
                    </label>
                    <input
                        type="checkbox"
                        name="historical"
                        onChange={this.showAllHistoricalOrders.bind(this)}
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