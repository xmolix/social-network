import React, {ComponentType, FC} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "./withAuthRedirect";

const HipHopHOC = <WP extends {hiphop: number}>(WrappedComponent: ComponentType<WP>) => {
    const ContainerComponent: FC<Omit<WP, "hiphop">> = (props) => {
        return <div><WrappedComponent {...props as WP} hiphop={10}/></div>
    }

    return ContainerComponent
}

const DanceHOC = <WP extends {dance: number}>(WrappedComponent: ComponentType<WP>) => {
    const ContainerComponent: FC<Omit<WP, "dance">> = (props) => {
        return <div><WrappedComponent {...props as WP} dance={18}/></div>
    }

    return ContainerComponent
}

type TCProps = {
    title: string,
    hiphop: number,
    dance: number,
    match: any
}


const TestCompose: FC<TCProps> = (props) => {
    return (
        <div>
            {props.title}
        </div>
    );
};

// const TShoc = HipHopHOC(TestCompose)
// const TShocs = DanceHOC(TShoc)

type FromHipHopHOCPropsType = Omit<TCProps, "hiphop">
type FromHipHopHOCType = ComponentType<FromHipHopHOCPropsType>
type FromDanceHOCType = ComponentType<Omit<FromHipHopHOCType, "dance">>

// const SuperHOC = compose<FromHipHopHOCType,
//     ComponentType<TCProps>,
//     FromDanceHOCType>(
//         DanceHOC,
//         HipHopHOC
// )

// const TShocs = SuperHOC(TestCompose)

// const App = () => {
//     // return <TShoc title={"Jura"} dance={29}/>
//     return <TShocs title={"Jura"}/>
// }

export default TestCompose;




// export const f1 = (a: string) => "Lox"
// const f2 = (a: string) => "100"
//
// let result = compose(f2, f1)(18)
//
// result = 12


let mstp = (state: any) => {
    return {
        dance: 12,
        hiphop: 100,
    }
}

// const C1_1connect = connect(mstp)(TestCompose)
// const ConnectedWitRouterC1 = withAuthRedirect(C1_1connect)
//
// const App2 = () => {
//     return <>
//         <ConnectedWitRouterC1 title={"It-kamasutra"} age={19} />
//     </>
// }