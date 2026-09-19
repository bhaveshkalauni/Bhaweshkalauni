// Power BI: Get Data → Blank query → Advanced Editor.
// Point Source to this workbook. Excel owns the forecast; Power BI presents it.
let
  Source = Excel.Workbook(File.Contents("tradeflow-france-india-softgoods.xlsx"), null, true),
  DimDate = Table.TransformColumnTypes(Source{[Item="tblDimDate",Kind="Table"]}[Data], {{"Date", type date}}),
  DimCategory = Source{[Item="tblDimCategory",Kind="Table"]}[Data],
  FactImports = Table.TransformColumnTypes(Source{[Item="tblFactImports",Kind="Table"]}[Data], {{"Date", type date}}),
  FactForecast = Table.TransformColumnTypes(Source{[Item="tblFactForecast",Kind="Table"]}[Data], {{"Date", type date}}),
  FactBacktest = Source{[Item="tblFactBacktest",Kind="Table"]}[Data]
in
  FactImports
