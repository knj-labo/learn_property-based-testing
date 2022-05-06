import fc from 'fast-check';
import { validatePassword } from "./validate-password";

const char = (charCodeFrom:number,charCodeTo: number) => fc.integer(charCodeFrom, charCodeTo).map(String.fromCharCode);
const filteredStrings = (min: number,max: number,filter:RegExp) => {
    return fc.array(char(33, //'!'
        126 //'~'
    ).filter(c => filter.test(c)),min,max).map(arr => arr.join(''));
}
const filteredNumber = (min:number,max:number) => filteredStrings(8,20,/^[0-9]$/);
const filteredAlphabet = (min:number,max:number) => filteredStrings(8,20,/^[a-zA-Z]$/);
const filteredSymbol = (min:number,max:number) => filteredStrings(8,20,/^[^a-zA-Z0-9]$/);

describe('パスワードは必須項目な場合', ()  => {
    it('空文字が入力された場合は、false を返す' , () => {
        expect(validatePassword("")).toBe(false)
    })
})

describe('パスワードは必ず8文字以上で20文字以下でならなければならない場合', () => {
    it('パスワードの値が8文字未満の場合は、falseを返す', () => {
        fc.assert(
            fc.property(fc.string(0, 7),(password: string) => {
              expect(validatePassword(password)).toBe(false)
            })
        )
    })
    it('パスワードの値が21文字以上の場合は、falseを返す', () => {
        fc.assert(
            fc.property(fc.string(21,100),(password:string) => {
                expect(validatePassword(password)).toBe(false)
            })
        )
    })
})

describe('パスワードは必ずアルファベット、数字や記号を含まなければならない場合', () => {
    it('数字のみしか含まれていない場合は、falseを返す', () => {
        fc.assert(
            fc.property(filteredNumber(0,8),(password:string) => {
                expect(validatePassword(password)).toBe(false)
            })
        );
    });
    it('アルファベットのみしか含まれていない場合は、falseを返す', () => {
        fc.assert(
            fc.property(filteredAlphabet(0,20),(password:string) => {
                expect(validatePassword(password)).toBe(false)
            })
        );
    });
    it('記号のみしか含まれていない場合は、falseを返す', () => {
        fc.assert(
            fc.property(filteredSymbol(0,20),(password:string) => {
                expect(validatePassword(password)).toBe(false)
            })
        );
    });
});