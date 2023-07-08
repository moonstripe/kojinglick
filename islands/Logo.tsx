import { IS_BROWSER } from "fresh/runtime.ts";
export default (props: any) => {

    const { setter } = props;

    const handleDark = () => {
        if (IS_BROWSER){
            if (localStorage.getItem('theme') !== 'dark') {
                localStorage.setItem('theme', 'dark');
                setter('dark');
            } else {
                localStorage.setItem('theme', 'light');
                setter('light');
            }
        }
    }

    return (
        <a onClick={handleDark}>
            <img
                src={IS_BROWSER ? localStorage.theme === 'dark' ? "/kojin_logo_invert.svg" : "/kojin_logo.svg" : "/kojin_logo_invert.svg"}
                width="33%"
                alt="A moon"
            />
        </a>
    )
}