interface TargetManifest {
    targetIndex: number;
    filename: string;
}

export interface CompileResult {
    targets: TargetManifest[];
}