
var _ = require('lodash');
var XLSX = require('xlsx-style');
var fileSaver = require('filesaver.js');
var moment = require('moment');


/* Purpose: Convert 2-dimensional arrays into XLSX workbook. */

/**
 * Create a new workbook.
 *
 * @returns {Object} with 2 keys: { Sheets, SheetNames }
 */

class XL {

    constructor(){
        this.createWorkbook.bind(this);
        this.createSheet.bind(this);
        this.createSheet2.bind(this);
        this.addSheetToWorkbook.bind(this);
        this._cleanUpSheetName.bind(this);
        this._noEqualSheetNames.bind(this);
        this.saveWorkbook.bind(this);
        this._generateCell.bind(this);
        this._mashUpUtcDateFromLocalTime.bind(this);
    }

    createWorkbook() {
        return {
            Sheets: {},
            SheetNames: []
        };
    }

    /**
     * Add a sheet to a workbook. Give it a name.
     *
     * @param {Object} workbook in form of { Sheets, SheetNames }
     * @param {String} name The name of the workbook
     * @param {Object} sheet The sheet, for example, generated with `createSheet()`
     * @returns {Object} The workbook.
     */

    addSheetToWorkbook(workbook, name, sheet) {
        let cleanedUpName = this._cleanUpSheetName(name);
        cleanedUpName = this._noEqualSheetNames(cleanedUpName, workbook.SheetNames);
        workbook.SheetNames.push(cleanedUpName);
        workbook.Sheets[cleanedUpName] = sheet;
        return workbook;
    }

    /**
     * Sheet names in Excel are much pickier than in other spreadsheet programs. If there
     * is a sheet name with invalid characters, then Excel will say the file is corrupted
     * and must be recovered.
     *
     * The rules are:
     * 1. Sheet names cannot contain : \ / * [ ] : ? (these are replaced with a blank, but [] are replace with ())
     * 2. Sheet names must be <= 31 characters (the sheet name is truncated to 31 characters)
     * 3. It cannot be called "History". (We put parenthesis around this word)
     *
     * Sheet names should also have extraneous spaces cleaned up within words as well as being HTML-escaped.
     */

    _cleanUpSheetName(sheetName) {
        let cleanSheetName = sheetName.trim();
        const replaceWithSpaceChars = /[\\|\/|\*|:|\?]/g;
        const replaceWithOpenParenChars = /\[/g;
        const replaceWithCloseParenChars = /\]/g;
        cleanSheetName = cleanSheetName.replace(replaceWithSpaceChars, "")
            .replace(replaceWithOpenParenChars, "(")
            .replace(replaceWithCloseParenChars, ")");
        if (cleanSheetName.length > 31) {
            cleanSheetName = cleanSheetName.slice(0, 31);
        }
        cleanSheetName = cleanSheetName.replace("History", "(History)");
        cleanSheetName = cleanSheetName.split(" ").filter(word => word).join(" ");
        return _.escape(cleanSheetName);
    }

    /**
     * Sheets cannot equal each other in Excel. If in the list of sheet names, it finds
     * a sheet with a name that is equal (or similar, due to renaming), it will rename the
     * sheet name to something else.
     *
     * @param {String} newSheetName The sheet name to test
     * @param {Object} sheetNames current list of sheet names.
     * @return {String} The potentially modified sheet name.
     */

    _noEqualSheetNames(newSheetName, sheetNames) {
        const matchingNames = _.filter(sheetNames,
            name =>
            name.match(new RegExp(`^${newSheetName}$`)) ||
            name.match(new RegExp(`^${newSheetName} (\\(\.\\))+?`)));
        if (matchingNames.length === 0) {
            return newSheetName;
        }
        const number = matchingNames.length;
        return `${newSheetName} (${number})`;
    }

    /**
     * Creates XLSX format (zip format with XLSX files in it) and sends the file
     * to the user.
     *
     * @param {Object} workbook in form of { Sheets, SheetNames }
     * @param {String} name the name of the file.
     * @param {Object} [writeOptions] any options to `XLSX.write()`
     */
    /* jshint bitwise:false */

    saveWorkbook(workbook, name, writeOptions = {}) {
        require(["jszip"], function (jszip) {
            window.JSZip = jszip;
            const opts = _.defaults({
                bookType: "xlsx",
                bookSST: true,
                type: "binary",
                cellDate: true
            }, writeOptions);
            const wbout = XLSX.write(workbook, opts);
            let buffer = new ArrayBuffer(wbout.length);
            let view = new Uint8Array(buffer);
            for (var i = 0; i !== wbout.length; ++i) {
                view[i] = wbout.charCodeAt(i) & 0xFF;
            }
            fileSaver.saveAs(new Blob([buffer], {type: "application/octet-stream"}), name + '.xlsx');
        });
    }

    /* jshint bitwise:true */

    /**
     * Convert two-dimensional array into a worksheet.
     *
     * @param {Array[]} data
     * @return {Object} The sheet with the formatted data.
     */

    createSheet(data) {
        let worksheet = {};
        data.forEach((row, rowIndex) => {
            row.forEach((cellData, colIndex) => {
                if (!_.isUndefined(cellData)) {
                    const cellRef = XLSX.utils.encode_cell({
                        c: colIndex,
                        r: rowIndex
                    });
                    worksheet[cellRef] = this._generateCell(cellData);
                }
            });
        });
        if (data.length > 0) {
            // Must tell Excel the range to work with (this case, the whole
            // sheet)
            const finalCell = {
                c: _.max(data, "length").length - 1,
                r: data.length - 1
            };
            worksheet["!ref"] = XLSX.utils.encode_range({
                s: {c: 0, r: 0},
                e: finalCell
            });
        }
        return worksheet;
    }

    createSheet2(data) {
        let worksheet = {};
        data.forEach((row, rowIndex) => {
            row.forEach((cellData, colIndex) => {
                if (!_.isUndefined(cellData)) {
                    const cellRef = XLSX.utils.encode_cell({
                        c: colIndex,
                        r: rowIndex
                    });
                    worksheet[cellRef] = cellData;
                }
            });
        });
        if (data.length > 0) {
            // Must tell Excel the range to work with (this case, the whole
            // sheet)
            const finalCell = {
                c: _.max(data, "length").length - 1,
                r: data.length - 1
            };
            worksheet["!ref"] = XLSX.utils.encode_range({
                s: {c: 0, r: 0},
                e: finalCell
            });
        }
        return worksheet;
    }

    /**
     * Formats data and generates a cell structure.
     *
     * @param {*} cellData
     * @return {Object} A cell in the form of { t(ype), v(alue), [z(date-format)]}
     */
    _generateCell(cellData) {
        let cell;
        let type;
        let format;
        let value = cellData;
        if (_.isNumber(cellData) && !_.isNaN(value)) {
            type = "n";
        } else if (_.isBoolean(value)) {
            type = "b";
        } else if (_.isDate(value)) {
            type = "d";
            value = this._mashUpUtcDateFromLocalTime(value);
            format = XLSX.SSF.get_table()[22];
        } else if (_.isString(value)) {
            type = "s";
        } else {
            throw new Error(`Cannot generate cell with provided data. Trying to generate cell with ${value}.`);
        }
        cell = {
            t: type,
            v: value,
            s: {
                fill: {
                    patternType: 'solid',
                    fgColor: {rgb: "00FF00"}
                },
                border: {
                    right: {
                        style: 'medium',
                        color: {
                            rgb: 'FFFFFFFF'
                        }
                    }
                }
            }
        };
        if (format) {
            cell.z = format;
        }
        return cell;
    }

    /**
     * With a localtime string, change a UTC time string to match the time of the localtime one.
     * Generally, Excel does not care about timezones, but the spec does. We need to be specific when generating
     * dates for XLSX cells, so there is no implicit assumption that the underlying value should be altered.
     *
     * @param {Date} date The localtime date
     * @return {String} a ISO 8601 time string in UTC format.
     */

    _mashUpUtcDateFromLocalTime(date) {
        const originalDate = moment(date);
        return moment(date).utc()
            .year(originalDate.year())
            .month(originalDate.month())
            .date(originalDate.date())
            .hour(originalDate.hour())
            .minute(originalDate.minute())
            .second(originalDate.second()).toISOString();
    }
}

export default XL