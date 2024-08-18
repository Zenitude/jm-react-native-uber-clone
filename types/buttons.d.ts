type ButtonProps = {
    styles: {
        container: StyleProp<any>;
        button: StyleProp<any>;
    };
    action: (event: GestureResponderEvent) => void;
    children: React.ReactNode;
}

type ButtonImageProps = {
    styles: {
        container: StyleProp<any>;
        button: StyleProp<any>;
        icon: StyleProp<any>;
    }
    src: ImageSourcePropType,
    action: (event: GestureResponderEvent) => void;
}

type ButtonModalProps = {
    styles: {
        container: StyleProp<any>;
        button: StyleProp<any>;
    };
    setter: React.Dispatch<React.SetStateAction<any>>;
    data: any;
    children: React.ReactNode;
}