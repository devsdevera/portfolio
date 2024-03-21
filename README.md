# k-Nearest Neighbors (kNN) Classifier

This program implements the k-nearest neighbors (kNN) algorithm for classification. Given a training dataset (wine_train.csv) and a test dataset (wine_test.csv), it calculates the Euclidean distance between each test instance and all training instances. It selects the k-nearest neighbors, and predicts a class label by majority vote. The program outputs the predicted classes alongside the distances to the k-nearest neighbors for all test instances into a CSV file (output.csv). Finally, the program evaluates accuracy by comparing predicted class with true class.

## Author

- Emmanuel De Vera
- Student ID: Deveremma 300602434
- Course: COMP307 (Third Year)

## Usage

1. Open a command line of your choice
2. Navigate to the directory `part1` containing my `kNN.py` program
3. `part1` contains datasets `wine_test.csv` `wine_train.csv`
4. Execute the following commands (copy and paste):

Using the Train set

`python kNN.py wine_train.csv wine_test.csv output.csv 3`  

`python kNN.py wine_train.csv wine_test.csv output.csv 1`    

`python kNN.py wine_train.csv wine_test.csv output.csv 90`    

Using the Test set

`python kNN.py wine_test.csv wine_train.csv output.csv 3`  

`python kNN.py wine_test.csv wine_train.csv output.csv 1`      

5. My program should print the accuracy % followed by the prediction table
6. My program also generates `output.csv` containing the prediction table
7. `part1` contains my output files `knn3_test.csv` `knn1_test.csv` `knn3_train.csv` `knn1_train.csv`

## Requirements

- collections
- pandas
- numpy
- sys
