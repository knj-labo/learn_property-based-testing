import fc from 'fast-check';
import { validatePassword } from "./validate-password";

describe('パスワードは必須項目な場合', ()  => {
    it('空文字が入力された場合は、false を返す' , () => {
        expect(validatePassword("")).toBe(false)
    })
})

describe('パスワードは必ず8文字以上で20文字以下でならなければならない場合', () => {
    it('パスワードの値が8文字未満の場合は、falseを返す', () => {
        fc.assert(
            fc.property(fc.string(0, 7),(password: string) => {
                console.log(password);
            })
        )
    })
    it('パスワードの値が21文字以上の場合は、falseを返す', () => {
        fc.assert(
            fc.property(fc.string(21,100),(password:string) => {
                console.log(password);
            })
        )
    })
})

describe('パスワードは必ずアルファベット、数字や記号を含まなければならない場合', () => {
    test('数字のみしか含まれていない場合は、falseを返す', () => {
        fc.assert(
            fc.property(fc.char(),(password:string) => {
                 console.log(password);
            })
        );
    });
    test('アルファベットのみしか含まれていない場合は、falseを返す', () => {
        fc.assert(
            fc.property(fc.char(),(password:string) => {
                 console.log(password);
            })
        );
    });
    test('記号のみしか含まれていない場合は、falseを返す', () => {
        fc.assert(
            fc.property(fc.char(),(password:string) => {
               console.log(password);
            })
        );
    });
});