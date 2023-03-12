//% weight=0 color=#C52746 icon="\uf1c0" block="Database"
//% advanced=false
//% groups="['Pairs Key = Value', 'Lists']"
namespace database {

    const PRE = "DB.";
    const PRE_CFG = PRE + "C.";
    const PRE_CFG_TEXT = PRE_CFG + "T.";
    const PRE_CFG_NUM = PRE_CFG + "N.";
    const PRE_LIST = PRE + "L.";



    //% blockId=toLine
    //% block="to line $val"
    //% group="Other"
    //% weight=20
    export function toLine(val: string): string {
        if (val.length >= 24) return val;

        let blanks: number = 24 - val.length;
        for (let c = 0; c <= blanks; c++) {
            val = val.concat(" ");
        }
        return val;

    }


    //% blockId=toLines
    //% block="lines $val"
    //% group="Other"
    //% weight=20
    export function toLines(val: string[]): string {

        let ret: string = "";
        for (let l = 0; l < val.length; l++) {
            ret = ret.concat(toLine(val[l]));
        }
        return ret;

    }


    //% blockId=deleteAll
    //% block="delete database"
    //% group="Database"
    //% weight=50
    export function deleteAll(): void {

        settings.clear();
        /*  const allkeys:string[] = settings.list(PRE);
      
          allkeys.forEach(function (value: string, index: number) {
              settings.
          })*/

    }


    //% blockId=exists
    //% block="database exists"
    //% group="Database"
    //% weight=50
    export function exists(): boolean {
        return settings.exists(PRE + "ON");
    }






    //% blockId=listAddValueAt
    //% block="add to list $list value $val"
    //% group="Lists"
    //% weight=80
    export function listAddValue(list: string, val: number) {
        const count: number = listCount(list);
        const position_key = PRE_LIST + list + "." + count;

        settings.writeNumber(position_key, val);

        // inc list counter
        const count_key = PRE_LIST + list + ':C:';
        settings.writeNumber(count_key, count + 1);

    }

    //% blockId=listGetValue
    //% block="value from list $list at index $index"
    //% group="Lists"
    //% weight=80
    export function listGetValueAt(list: string, index: number): number {

        const position_key = PRE_LIST + list + "." + index;
        return settings.readNumber(position_key);

    }

    //% blockId=listCount
    //% block="length of $list"
    //% group="Lists"
    //% weight=80
    export function listCount(list: string): number {

        const count_key = PRE_LIST + list + ':C:';
        const count = settings.readNumber(count_key);

        if (count == undefined) return 0;

        return count;

    }

    //% block="delete list $list"
    //% group="Lists"
    //% weight=80
    export function deleteList(list: string) {

        const allListkeys: string[] = settings.list(PRE_LIST + list);

        allListkeys.forEach(function (value: string, index: number) {
            settings.remove(value);
        })

    }


    //% blockId=setTextValue
    //% block="set key $key to text $val"
    //% group="Pairs Key = Value"
    //% weight=100
    export function setTextValue(key: string, val: string) {
        settings.writeString(PRE_CFG_TEXT + key, val)
        settings.writeNumber(PRE_CFG_NUM + key, parseInt(val));

        settings.writeNumber(PRE + "ON", 1);
    }

    //% blockId=getTextValue
    //% block="get key $key as text"
    //% group="Pairs Key = Value"
    //% weight=100
    export function getTextValue(key: string): string {
        return settings.readString(PRE_CFG_TEXT + key)
    }

    //% blockId=setNumberValue
    //% block="set key $key to number $val"
    //% group="Pairs Key = Value"
    //% weight=100
    export function setNumberValue(key: string, val: number) {
        settings.writeNumber(PRE_CFG_NUM + key, val)
        settings.writeString(PRE_CFG_TEXT + key, val.toString())

        settings.writeNumber(PRE + "exists", 1);
    }

    //% blockId=getNumberValue
    //% block="get key $key as number"
    //% group="Pairs Key = Value"
    //% weight=100
    export function getNumberValue(key: string): number {
        return settings.readNumber(PRE_CFG_NUM + key)
    }

    //% blockId=existsKey
    //% block="exists key $key"
    //% group="Pairs Key = Value"
    //% weight=100
    export function existsKey(key: string): boolean {
        return settings.exists(PRE_CFG_NUM + key) || settings.exists(PRE_CFG_TEXT + key);

    }

    //% blockId=removeKey
    //% block="remove key $key"
    //% group="Pairs Key = Value"
    //% weight=100
    export function removeKey(key: string): void {
        settings.remove(PRE_CFG_NUM + key);
        settings.remove(PRE_CFG_TEXT + key);
    }
}
