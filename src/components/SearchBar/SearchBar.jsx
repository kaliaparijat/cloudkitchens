import React from 'react';

class SearchBar extends React.Component {

    filterBySelection = (e) => {
        console.log(`filter by ${e.currentTarget.value}`);
        this.props.onCookingChange(!this.props.isCooking);
    }

    render() {
        return (
            <form className="searchBar">

                <label htmlFor="cooked">Get all cooked orders in past <input
                    type="text"
                    name="cooked"
                    defaultValue={this.props.searchText}
                /> seconds</label>
                <p>
                    <input
                        type="radio"
                        name="filter"
                        value="cooking"
                        checked={this.props.isCooking}
                        onChange={this.filterBySelection}
                    />
                    <label htmlFor="cooking"
                           name="cooking-label"
                    >
                        Orders currently cooking
                    </label>
                    <input
                        type="radio"
                        name="filter"
                        value="historical"

                        checked={this.props.isHistorical}
                        onChange={this.filterBySelection}
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