import { ChartJsHelper } from "./ChartJsHelper.js";

export class ChartHelperFactory {
    createChartHelper(type, api) {
        switch (type) {
            case ChartJsHelper.prototype.HelperType:
                return new ChartJsHelper(api);
            default:
                throw new Error("Unrecognized chart helper: " + type);
        }
    }
}
