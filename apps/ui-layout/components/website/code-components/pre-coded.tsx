import { Pre, RawCode, highlight } from 'codehike/code';
import prettier from 'prettier';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import { CopyButton } from './copy-button';
import { cn } from '@/lib/utils';
import ts from 'typescript';
import { callout, lineNumbers, wordWrap } from '../constant';

export async function PreCoded({
  codeblock,
  classname,
  tabclassname,
  copyclass,
}: {
  codeblock: string;
  classname?: string;
  tabclassname?: string;
  copyclass?: string;
}) {
  const result = ts.transpileModule(codeblock, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: true,
    },
  });

  let jsCode = result.outputText.replace(/"use strict";\s*/, '');

  // Format JavaScript code using Prettier
  const formattedJsCode = await prettier.format(jsCode, {
    parser: 'babel',
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 80,
    jsxBracketSameLine: true, // Keep JSX tags in one line
  });

  const tsCode = {
    value: codeblock,
    lang: 'tsx',
    meta: '',
  };

  const jsCodeblock = {
    value: formattedJsCode,
    lang: 'js',
    meta: '',
  };

  // Highlight the code
  const tshighlighted = await highlight(tsCode, 'github-from-css');
  const jshighlighted = await highlight(jsCodeblock, 'github-from-css');

  return (
    <div className='relative not-prose'>
      <Tabs defaultValue={'typescript'}>
        <TabsList
          className={cn(
            'absolute dark:bg-zinc-800 right-[5.5rem] top-6 z-[1] h-9 p-0.5  border-2',
            tabclassname
          )}
        >
          <TabsTrigger
            value={'typescript'}
            className='h-7 rounded text-foreground'
          >
            Ts
          </TabsTrigger>
          <TabsTrigger
            value={'javascript'}
            className='rounded h-7  text-foreground'
          >
            Js{' '}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'typescript'}>
          <div className={cn('relative p-4', classname)}>
            <CopyButton
              code={tshighlighted.code}
              classname={cn(
                'top-6 right-10 dark:bg-zinc-900 border bg-white',
                copyclass
              )}
            />
            <div className=' p-2 max-h-[500px] overflow-x-hidden  rounded-md text-sm  bg-codebg border'>
              <Pre
                code={tshighlighted}
                handlers={[callout, wordWrap, lineNumbers]}
                className={cn('m-0', classname)}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value={'javascript'}>
          <div className={cn('relative p-4', classname)}>
            <CopyButton
              code={jshighlighted.code}
              classname={cn(
                'top-6 right-10 dark:bg-zinc-900 border bg-white',
                copyclass
              )}
            />
            <div className='p-2 max-h-[500px] overflow-x-hidden  rounded-md text-sm bg-codebg border'>
              <Pre
                code={jshighlighted}
                handlers={[callout, wordWrap, lineNumbers]}
                className={cn(' m-0', classname)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
