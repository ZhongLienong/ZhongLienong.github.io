'use client';

import { useEffect, useRef, useState } from 'react';

interface ExecutionResult {
	success: boolean;
	output: string;
	error: string;
	exitCode: number;
}

interface MidoriModule {
	executeMidoriCode: (code: string) => ExecutionResult;
}

const DEFAULT_CODE = `import { "/MidoriPrelude/IO.mdr" }

// Welcome to Midori Playground!
defun factorial(n: Int) : Int => {
    return if n <= 1
        then 1
        else n * factorial(n - 1);
};

def result = factorial(5);
IO::PrintLine("Factorial of 5 is: " ++ (result as Text));
`;

export default function MidoriPlayground() {
	const [code, setCode] = useState(DEFAULT_CODE);
	const [output, setOutput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const midoriModuleRef = useRef<MidoriModule | null>(null);
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const lineNumbersRef = useRef<HTMLDivElement>(null);

	const lineCount = code.split('\n').length;

	useEffect(() => {
		setOutput('Welcome to Midori Playground!\n\nLoading runtime...');
		loadMidoriModule();
	}, []);

	useEffect(() => {
		syncScroll();
	}, [code]);

	const syncScroll = () => {
		if (editorRef.current && lineNumbersRef.current) {
			lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
		}
	};

	const loadMidoriModule = async () => {
		try {
			setIsLoading(true);
			setOutput('Loading Midori WebAssembly runtime...\nThis may take a moment...');

			const scriptId = 'midori-wasm-script';
			const existingScript = document.getElementById(scriptId);
			if (existingScript) existingScript.remove();

			const script = document.createElement('script');
			script.id = scriptId;
			script.src = '/midori.js';
			script.async = true;

			await new Promise<void>((resolve, reject) => {
				script.onload = () => resolve();
				script.onerror = () => reject(new Error('Failed to load midori.js'));
				document.body.appendChild(script);
			});

			await new Promise(resolve => setTimeout(resolve, 500));

			const createMidoriModule = (window as any).createMidoriModule;
			if (!createMidoriModule) {
				throw new Error('createMidoriModule not found');
			}

			const module = await createMidoriModule();

			// Load MidoriPrelude files
			const preludeFiles = ['IO.mdr', 'Math.mdr', 'DateTime.mdr', 'Array.mdr', 'Convertable.mdr'];

			try {
				module.FS_createPath('/', 'MidoriPrelude', true, true);
			} catch (e) {}

			for (const fileName of preludeFiles) {
				try {
					const response = await fetch(`/MidoriPrelude/${fileName}`);
					if (response.ok) {
						const content = await response.text();
						module.FS_createDataFile('/MidoriPrelude', fileName, content, true, true, true);
					}
				} catch (e) {}
			}

			midoriModuleRef.current = module;
			setOutput('✓ Midori runtime loaded!\n\nReady to execute. Press Ctrl+Enter to run your code.');
			setError(null);
			setIsLoading(false);
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : String(err);
			setError(`Failed to load runtime: ${errorMsg}`);
			setOutput(`Error loading Midori runtime.\n\n${errorMsg}\n\nMake sure midori.js and midori.wasm are in the /public folder.`);
			setIsLoading(false);
		}
	};

	const runCode = () => {
		if (!midoriModuleRef.current || isRunning) return;

		try {
			setIsRunning(true);
			setOutput('Running...\n');

			setTimeout(() => {
				try {
					const result = midoriModuleRef.current!.executeMidoriCode(code);

					if (result.success) {
						setOutput(`✓ Execution successful!\n\n${result.output || '(No output)'}`);
						setError(null);
					} else {
						setOutput(`✗ Execution failed\n\n${result.error}`);
						setError(result.error);
					}
				} catch (err) {
					const errorMsg = err instanceof Error ? err.message : String(err);
					setOutput(`Runtime error: ${errorMsg}`);
					setError(errorMsg);
				} finally {
					setIsRunning(false);
				}
			}, 100);
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : String(err);
			setOutput(`Error: ${errorMsg}`);
			setError(errorMsg);
			setIsRunning(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault();
			runCode();
		}

		if (e.key === 'Tab') {
			e.preventDefault();
			const textarea = e.currentTarget;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const newCode = code.substring(0, start) + '    ' + code.substring(end);
			setCode(newCode);
			setTimeout(() => {
				textarea.selectionStart = textarea.selectionEnd = start + 4;
			}, 0);
		}
	};

	const loadExample = (exampleCode: string) => {
		setCode(exampleCode);
		setOutput('Example loaded. Press Ctrl+Enter to run.');
	};

	return (
		<div className="playground-container">
			<style jsx>{`
				.playground-container {
					background: #1e1e1e;
					min-height: 100vh;
					display: flex;
					flex-direction: column;
					font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
				}

				.toolbar {
					background: #2d2d30;
					border-bottom: 1px solid #454545;
					padding: 8px 16px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.toolbar-left {
					display: flex;
					align-items: center;
					gap: 12px;
				}

				.toolbar-title {
					color: #cccccc;
					font-size: 13px;
					font-weight: 600;
				}

				.toolbar-right {
					display: flex;
					gap: 8px;
				}

				.btn {
					background: #0e639c;
					color: #ffffff;
					border: none;
					padding: 6px 14px;
					font-size: 13px;
					font-weight: 500;
					cursor: pointer;
					border-radius: 2px;
					font-family: inherit;
					transition: background 0.2s;
				}

				.btn:hover:not(:disabled) {
					background: #1177bb;
				}

				.btn:disabled {
					background: #3e3e42;
					color: #858585;
					cursor: not-allowed;
				}

				.btn-success {
					background: #16825d;
				}

				.btn-success:hover:not(:disabled) {
					background: #1a9c70;
				}

				.btn-secondary {
					background: #3e3e42;
					color: #cccccc;
				}

				.btn-secondary:hover:not(:disabled) {
					background: #505050;
				}

				.main-content {
					flex: 1;
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 0;
					overflow: hidden;
				}

				@media (max-width: 900px) {
					.main-content {
						grid-template-columns: 1fr;
					}
				}

				.editor-section, .output-section {
					display: flex;
					flex-direction: column;
					background: #1e1e1e;
				}

				.editor-section {
					border-right: 1px solid #454545;
				}

				@media (max-width: 900px) {
					.editor-section {
						border-right: none;
						border-bottom: 1px solid #454545;
					}
				}

				.section-header {
					background: #252526;
					border-bottom: 1px solid #454545;
					padding: 8px 12px;
					color: #cccccc;
					font-size: 11px;
					font-weight: 600;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}

				.editor-wrapper {
					flex: 1;
					display: flex;
					position: relative;
					overflow: hidden;
				}

				.line-numbers {
					background: #1e1e1e;
					color: #858585;
					padding: 16px 8px 16px 16px;
					font-size: 14px;
					line-height: 1.6;
					text-align: right;
					user-select: none;
					border-right: 1px solid #2d2d30;
					overflow: hidden;
				}

				.code-editor {
					flex: 1;
					background: #1e1e1e;
					color: #d4d4d4;
					border: none;
					padding: 16px;
					font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
					font-size: 14px;
					line-height: 1.6;
					resize: none;
					outline: none;
					overflow-y: auto;
				}

				.code-editor::-webkit-scrollbar {
					width: 14px;
					height: 14px;
				}

				.code-editor::-webkit-scrollbar-thumb {
					background: #424242;
					border: 3px solid #1e1e1e;
					border-radius: 7px;
				}

				.code-editor::-webkit-scrollbar-thumb:hover {
					background: #4e4e4e;
				}

				.code-editor::-webkit-scrollbar-track {
					background: #1e1e1e;
				}

				.output-display {
					flex: 1;
					background: #1e1e1e;
					color: #cccccc;
					padding: 16px;
					font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
					font-size: 13px;
					line-height: 1.6;
					overflow-y: auto;
					white-space: pre-wrap;
					word-wrap: break-word;
				}

				.output-display::-webkit-scrollbar {
					width: 14px;
					height: 14px;
				}

				.output-display::-webkit-scrollbar-thumb {
					background: #424242;
					border: 3px solid #1e1e1e;
					border-radius: 7px;
				}

				.output-display::-webkit-scrollbar-thumb:hover {
					background: #4e4e4e;
				}

				.output-display.error {
					color: #f48771;
				}

				.output-display.success {
					color: #89d185;
				}

				.examples-section {
					background: #252526;
					border-top: 1px solid #454545;
					padding: 12px 16px;
				}

				.examples-label {
					color: #cccccc;
					font-size: 11px;
					font-weight: 600;
					margin-bottom: 8px;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}

				.examples-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
					gap: 8px;
				}

				.example-btn {
					background: #3e3e42;
					color: #cccccc;
					border: none;
					padding: 6px 12px;
					font-size: 12px;
					cursor: pointer;
					border-radius: 2px;
					font-family: inherit;
					text-align: left;
					transition: background 0.2s;
				}

				.example-btn:hover {
					background: #505050;
				}

				.status-bar {
					background: #007acc;
					color: #ffffff;
					padding: 4px 16px;
					font-size: 12px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.status-item {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.shortcut-hint {
					color: #a0a0a0;
					font-size: 11px;
					margin-left: 4px;
				}
			`}</style>

			<div className="toolbar">
				<div className="toolbar-left">
					<span className="toolbar-title">Midori Playground</span>
					<span className="shortcut-hint">Ctrl+Enter to run</span>
				</div>
				<div className="toolbar-right">
					<button
						className="btn btn-success"
						onClick={runCode}
						disabled={!midoriModuleRef.current || isRunning || isLoading}
					>
						{isLoading ? 'Loading Runtime...' : isRunning ? 'Running...' : '▶ Run Code'}
					</button>
				</div>
			</div>

			<div className="main-content">
				<div className="editor-section">
					<div className="section-header">main.mdr</div>
					<div className="editor-wrapper">
						<div className="line-numbers" ref={lineNumbersRef}>
							{Array.from({ length: lineCount }, (_, i) => (
								<div key={i + 1}>{i + 1}</div>
							))}
						</div>
						<textarea
							ref={editorRef}
							className="code-editor"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							onKeyDown={handleKeyDown}
							onScroll={syncScroll}
							spellCheck={false}
							placeholder="Write your Midori code here..."
						/>
					</div>
				</div>

				<div className="output-section">
					<div className="section-header">Output</div>
					<div className={`output-display ${error ? 'error' : 'success'}`}>
						{output || 'No output yet.'}
					</div>
				</div>
			</div>

			<div className="examples-section">
				<div className="examples-label">Examples</div>
				<div className="examples-grid">
					<button className="example-btn" onClick={() => loadExample(DEFAULT_CODE)}>
						Factorial
					</button>
					<button className="example-btn" onClick={() => loadExample(`import { "/MidoriPrelude/IO.mdr" }

defun fib(n: Int) : Int => {
    return if n <= 1
        then n
        else fib(n - 1) + fib(n - 2);
};

def result = fib(10);
IO::PrintLine("Fibonacci(10) = " ++ (result as Text));
`)}>
						Fibonacci
					</button>
					<button className="example-btn" onClick={() => loadExample(`import { "/MidoriPrelude/IO.mdr" }

union Option<T> = Some(T) | None;

defun unwrap<T>(opt: Option<T>, default_val: T) : T => {
    return match opt with
        case Option::Some(value) => value
        case Option::None => default_val
        default => default_val
    ;
};

def some_value = new Option::Some(42);
def none_value = new Option::None<Int>();

IO::PrintLine("Some: ");
IO::PrintLine(unwrap(some_value, 0) as Text);
IO::PrintLine("None: ");
IO::PrintLine(unwrap(none_value, 99) as Text);
`)}>
						Pattern Matching
					</button>
					<button className="example-btn" onClick={() => loadExample(`import { "/MidoriPrelude/IO.mdr" }

defun make_adder(x: Int) : fn(Int) -> Int => {
    return fn(y: Int) : Int => x + y;
};

def add_five = make_adder(5);
def result = add_five(10);

IO::PrintLine("5 + 10 = " ++ (result as Text));
`)}>
						Closures
					</button>
				</div>
			</div>

			<div className="status-bar">
				<div className="status-item">
					<span>{midoriModuleRef.current ? '● Ready' : '○ Not Loaded'}</span>
				</div>
				<div className="status-item">
					<span>Lines: {lineCount}</span>
					<span>|</span>
					<span>Midori v1.0</span>
				</div>
			</div>
		</div>
	);
}
