import { makeInStaller } from "@elementplus-kit/utils";
import components from "./components";

const installer = makeInStaller(components);

export * from "../components"
export default installer;