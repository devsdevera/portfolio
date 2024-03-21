# Decision Tree Classifier

My Python program implements a decision tree algorithm for binary classification. It builds a decision tree based on the provided datasets and classifies instances into one of two classes (0 or 1). The decision tree is grown recursively, splitting the data based on the feature that maximizes information gain at each step. The resulting tree structure is written to an output file (output.txt), including information about information gain and entropy at each node. Finally, the accuracy of the constructed tree is computed and printed.

## Author

- Emmanuel De Vera
- Student ID: Deveremma 300602434

## Usage

1. open up a command line of your choice
2. Navigate to the directory `part2` containing my `DecisionTree.py` program
3. `part2` also contains `rtg_A.csv` `rtg_B.csv` `rtg_C.csv`
4. Execute the following commands (copy and paste):

`python DecisionTree.py rtg_A.csv output.txt`  

`python DecisionTree.py rtg_B.csv output.txt`  

`python DecisionTree.py rtg_C.csv output.txt`  

## Requirements

- Python 3.x
- pandas
- numpy



