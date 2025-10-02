export interface Dataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    pointRadius?: number;
    borderWidth?: number;
}

export interface ChartData {
    labels: string[];
    datasets: Dataset[];
}

export interface RegressionResult {
    predictedY: number[];
    slope: number;
}