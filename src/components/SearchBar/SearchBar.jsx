import React from 'react';


class SearchBar extends React.Component {
    render() {
        const { onFilterTextChange, onCookingChecked, onHistoricalChecked } = this.props;
        return (
            <form class="searchBar">

                <label for="cooked">Get all cooked orders in past <input
                    type="text"
                    name="cooked"
                /> seconds</label>
                <p>
                    <input
                        type="checkbox"
                        name="cooking"
                        onChange={onFilterTextChange}
                    />
                    <label for="cooking"
                           name="cooking-label"
                           onCookingChecked={onCookingChecked}
                    >
                        Orders currently cooking
                    </label>
                    <input
                        type="checkbox"
                        name="historical"
                        onHistoricalChecked={onHistoricalChecked}
                    />
                    <label for="historical"
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