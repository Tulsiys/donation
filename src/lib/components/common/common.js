import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import { DATE_FORMAT, HOUR_MINS, REGEX } from './constant';


export const Common = {
    getReadableDateFormat,
    navigateToLink,
    standardDateFormat,
    disableFutureDt,
    copyURL,
    isValidField,
    mobileFormatter,
    formatNumber,
    dateFormatterLeftBlock,
    stringTitleCase,
    convertToLowerCase
};

function stringTitleCase (value){
    return value.toLowerCase().replace(REGEX.TITLECASE, s => s.toUpperCase())
}

function isValidField(value) {
    if (value === "" || value === null || value === 'null' || value === 'NA' || value === " " || value === undefined || value === "NULL" || value === []
    ) {
        return false
    } else {
        return true
    }
}
function convertToLowerCase(value) {
    if (value === "" || value === null || value === 'NA' || value === " " || value === undefined
    ) {
        return value
    } else {
        return value.toLowerCase()
    }
}
function getReadableDateFormat(value) {
    var given = moment("2021-06-28 17:00:00", "YYYY-MM-DD hh:mm:ss");
    var current = moment();
    var diff = moment.duration(given.diff(current));
}

function formatNumber(e) {
    if (!/[0-9]/.test(e.clipboardData.getData('text/plain'))) {
        e.preventDefault();
    }
    else {
        var val = e.clipboardData.getData('text/plain').replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
        setTimeout(() => {
            e.target.value = '';
            e.target.value = val;
            e.preventDefault();
        }, 4);
        // 2223003122003222
    }
}

function navigateToLink(navlink) {
    window.open(navlink, '_blank');
}

function standardDateFormat(cell) {
    if (!cell) { return ""; }
    if (typeof cell === 'string') {
        return `${moment(cell).format('D MMM YYYY')}`;
    }
}

function disableFutureDt(current) {
    const today = moment();
    return current.isBefore(today)
}

function copyURL() {
    const elem = document.createElement('input');
    elem.value = document.URL;
    // elem.hidden = true;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}

function mobileFormatter(cell, row) {
    if (Common.isValidField(cell)) {
        return <CurrencyFormat displayType={'text'} format="+## #### ######" mask="" value={cell} />
    } else {
        return '-'; //<span className="d-block text-center no-value">-</span>
    }
}

function dateFormatterLeftBlock(cell) {
    if (!cell) { return ""; }

    let dateTime;
    if (typeof cell === 'string') {
        dateTime = cell.trim().split(' ');
    }

    if (typeof cell === 'string' && dateTime.length > 1) {
        return `${moment(new Date(dateTime[0].replace(/-/g, "/"))).format(DATE_FORMAT)} | ${moment((dateTime[1] + ' ' + dateTime[2]), [HOUR_MINS]).format(HOUR_MINS)}`;
    } else {
        return `${moment(cell).format(DATE_FORMAT)} | ${moment(cell).format(HOUR_MINS)}`;
    }
    
}