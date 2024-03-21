# k-Nearest Neighbors (kNN) Classifier

This program implements the k-nearest neighbors (kNN) algorithm for classification. Given a training dataset (wine_train.csv) and a test dataset (wine_test.csv), it calculates the Euclidean distance between each test sample and all training samples, selects the k-nearest neighbors, and assigns the class label by majority voting. The program outputs the predicted class labels for the test samples along with their corresponding distances to the nearest neighbors into a CSV file (output.csv). The value of k, determining the number of neighbors considered, is specified as a command-line argument. Finally, the program evaluates the accuracy of the classification and prints the results.

## Author

- Emmanuel De Vera
- Student ID: Deveremma 300602434
- Course: COMP307 (Third Year)

## Usage

1. Open a command line of your choice
2. Navigate to the directory `part2` containing my `DecisionTree.py` program
3. `part2` contains datasets `rtg_A.csv` `rtg_B.csv` `rtg_C.csv`
4. Execute the following commands (copy and paste):

`python DecisionTree.py rtg_A.csv output.txt`  

`python DecisionTree.py rtg_B.csv output.txt`  

`python DecisionTree.py rtg_C.csv output.txt`  

5. My program should print the decision tree followed by accuracy %
6. My program also generates `output.txt` containing the decision tree
7. `part2` contains my DT output files `DT_A.txt` `DT_B.txt` `DT_C.txt`

## Requirements

- pandas
- numpy
- sys
