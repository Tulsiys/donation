import React from 'react';

class FlickeringSavedCards extends React.Component {
    render() {
        return (
            <div className="fleckring-effect">
                <div className="item-saved-card">
                    <div class="c-radio">
                        <div class="dummy-radio"><span>&nbsp;</span></div>
                    </div>
                    <label for="Kali-K" class="c-details">
                        <div class="card-and-expired">
                            <div class="box c-img"></div>
                            <div class="c-ending-in">
                                <div class="box msg-ending"></div>
                            </div>
                        </div>
                        <div class="c-expiry">
                            <div class="box msg-expiry"></div>
                        </div>
                    </label>
                </div>
                {/* <div className="box item-saved-card"></div> */}
            </div>
        )
    }
}
export default FlickeringSavedCards;