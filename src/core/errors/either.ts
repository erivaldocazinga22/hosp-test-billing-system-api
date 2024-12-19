export type Either<L,R> = Left<L,R> | Rigth<L,R>

export class Left<L,R> {
    public value: L
    constructor(value: L) {
        this.value = value
    }

    isLeft(): this is Left<L,R> {
        return true
    }

    isRight(): this is Rigth<L,R> {
        return false
    }
}

export class Rigth<L,R> {
    public value: R
    constructor(value: R) {
        this.value = value
    }

    isLeft(): this is Left<L,R> {
        return false
    }

    isRight(): this is Rigth<L,R> {
        return true
    }
}

export const left = <L,R>(l: L) => {
    return new Left(l)
}

export const right = <L,R>(r: R) => {
    return new Rigth(r)
}