import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  Animated,
} from 'react-native';

import {VictoryPie} from 'victory-native';

import {COLORS, FONTS, SIZES, icons} from '../constants';

const Home = () => {
  // Dummy Date
  const confirmStatus = 'C';
  const pendingStatus = 'P';

  let categoriesData = [
    {
      id: 1,
      name: 'Education',
      icon: icons.education,
      color: COLORS.yellow,
      expenses: [
        {
          id: 1,
          title: 'Tution Fee',
          description: 'Tuition fee',
          location: "ByProgramers' tution center",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 2,
          title: 'Arduino',
          description: 'Hardward',
          location: "ByProgramers' tution center",
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 3,
          title: 'Javascript Books',
          description: 'Javascript books',
          location: "ByProgramers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
        {
          id: 4,
          title: 'PHP Books',
          description: 'PHP books',
          location: "ByProgramers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 2,
      name: 'Nutrition',
      icon: icons.food,
      color: COLORS.lightBlue,
      expenses: [
        {
          id: 5,
          title: 'Vitamins',
          description: 'Vitamin',
          location: "ByProgramers' Pharmacy",
          total: 25.0,
          status: pendingStatus,
        },
        {
          id: 6,
          title: 'Protein powder',
          description: 'Protein',
          location: "ByProgramers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 3,
      name: 'Child',
      icon: icons.baby_car,
      color: COLORS.darkgreen,
      expenses: [
        {
          id: 7,
          title: 'Toys',
          description: 'toys',
          location: "ByProgramers' Toy Store",
          total: 25.0,
          status: confirmStatus,
        },
        {
          id: 8,
          title: 'Baby Car Seat',
          description: 'baby car seat',
          location: "ByProgramers' Baby Care Store",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 9,
          title: 'Pampers',
          description: 'pampers',
          location: "ByProgramers'  Supermarket",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 10,
          title: 'Baby T-Shirt',
          description: 't-shirt',
          location: "ByProgramers' Fashion Store",
          total: 20.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 4,
      name: 'Beauty & Care',
      icon: icons.healthcare,
      color: COLORS.peach,
      expenses: [
        {
          id: 11,
          title: 'Skin Care product',
          description: 'skin care',
          location: "ByProgramers' Pharmacy",
          total: 10.0,
          status: pendingStatus,
        },
        {
          id: 12,
          title: 'Lotion',
          description: 'lotion',
          location: "ByProgramers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
        {
          id: 13,
          title: 'Face Mask',
          description: 'face mask',
          location: "ByProgramers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
        {
          id: 14,
          title: 'Sunscreen cream',
          description: 'sunscreen cream',
          location: "ByProgramers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 5,
      name: 'Sports',
      icon: icons.sports_icon,
      color: COLORS.purple,
      expenses: [
        {
          id: 15,
          title: 'Gym Membership',
          description: 'monthly fee',
          location: "ByProgramers' Gym",
          total: 45.0,
          status: pendingStatus,
        },
        {
          id: 16,
          title: 'Gloves',
          description: 'Gym Eequipment',
          location: "ByProgramers' Gym",
          total: 15.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 6,
      name: 'Clothing',
      icon: icons.cloth_icon,
      color: COLORS.red,
      expenses: [
        {
          id: 17,
          title: 'T-Shirt',
          description: 'Plain Color T-Shirt',
          location: "ByProgramers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 18,
          title: 'Jeans',
          description: 'blue jeans',
          location: "ByProgramers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
  ];

  const categoryListHeightAnimationValue = useRef(new Animated.Value(130))
    .current;

  const [categories, setCategories] = useState(categoriesData);
  const [viewMode, setViewMode] = useState('chart');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMoreToogle, setShowMoreToogle] = useState(false);

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', width: 50}}
          onPress={() => console.log('Back')}>
          <Image
            source={icons.back_arrow}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{justifyContent: 'center', width: 50, alignItems: 'flex-end'}}
          onPress={() => console.log('More')}>
          <Image
            source={icons.more}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h2}}>My Expenses</Text>
          <Text style={{color: COLORS.darkgray, ...FONTS.h3}}>
            Sumary (private)
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: COLORS.lightGray,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.calendar}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue,
              }}
            />
          </View>
          <View style={{marginLeft: SIZES.padding}}>
            <Text style={{color: COLORS.primary, ...FONTS.h3}}>
              23 Jan, 2021
            </Text>
            <Text style={{color: COLORS.darkgray, ...FONTS.body3}}>
              18% more than last month
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: SIZES.padding,
        }}>
        {/* Title */}
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h3}}>Category</Text>
          <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
            {categories.length} Total
          </Text>
        </View>

        {/* Buttons */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              backgroundColor: viewMode == 'chart' ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => {
              setViewMode('chart');
            }}>
            <Image
              source={icons.chart}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == 'chart' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              backgroundColor: viewMode == 'list' ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => {
              setViewMode('list');
            }}>
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == 'list' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryList() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(item);
          }}
          style={{
            flex: 1,
            flexDirection: 'row',
            margin: 5,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}>
          <Image
            source={item.icon}
            style={{
              width: 20,
              height: 20,
              tintColor: item.color,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.primary,
              ...FONTS.h4,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{paddingHorizontal: SIZES.padding - 5}}>
        <Animated.View style={{height: categoryListHeightAnimationValue}}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.base,
            justifyContent: 'center',
          }}
          onPress={() => {
            if (showMoreToogle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 130,
                duration: 300,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 190,
                duration: 300,
                useNativeDriver: false,
              }).start();
            }

            setShowMoreToogle(!showMoreToogle);
          }}>
          <Text style={{...FONTS.body4}}>
            {showMoreToogle ? 'LESS' : 'MORE'}
          </Text>
          <Image
            source={showMoreToogle ? icons.up_arrow : icons.down_arrow}
            style={{marginLeft: 5, width: 15, height: 15, alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderIcomingExpensesTitle() {
    return (
      <View style={{padding: SIZES.padding, color: COLORS.lightGray2}}>
        <Text style={{color: COLORS.primary, ...FONTS.h3}}>
          Icoming Expenses
        </Text>
        <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>12 total</Text>
      </View>
    );
  }

  function renderIncomingExpenses() {
    let allExpenses = selectedCategory ? selectedCategory.expenses : [];
    // Fillter pending expenses
    let incomingExpenses = allExpenses.filter((a) => a.status == 'P');

    const renderItem = ({item, index}) => {
      return (
        <View
          style={{
            width: 300,
            marginRight: SIZES.padding,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginVertical: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}>
          {/*Title*/}
          <View
            style={{
              flexDirection: 'row',
              padding: SIZES.padding,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: COLORS.lightGray,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: SIZES.base,
              }}>
              <Image
                source={selectedCategory.icon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: selectedCategory.color,
                }}
              />
            </View>
            <Text style={{color: selectedCategory.color, ...FONTS.h3}}>
              {selectedCategory.name}
            </Text>
          </View>

          {/* Expenses description*/}
          <View style={{paddingHorizontal: SIZES.padding}}>
            {/* Title and Description */}
            <Text style={{...FONTS.h2}}>{item.title}</Text>
            <Text
              style={{
                ...FONTS.body3,
                flexWrap: 'wrap',
                color: COLORS.darkgray,
              }}>
              {item.description}
            </Text>

            {/* Location */}
            <Text style={{marginTop: SIZES.padding, ...FONTS.h4}}>
              Location
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.pin}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                  marginRight: 5,
                }}
              />
              <Text
                style={{
                  marginBottom: SIZES.base,
                  color: COLORS.darkgray,
                  ...FONTS.body4,
                }}>
                {item.location}
              </Text>
            </View>
          </View>

          {/* Price */}
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomStartRadius: SIZES.radius,
              borderBottomEndRadius: SIZES.radius,
              backgroundColor: selectedCategory.color,
            }}>
            <Text style={{color: COLORS.white, ...FONTS.body3}}>
              COMFIRM {item.total.toFixed(2)} USD
            </Text>
          </View>
        </View>
      );
    };

    return (
      <View>
        {renderIcomingExpensesTitle()}

        {incomingExpenses.length > 0 && (
          <FlatList
            data={incomingExpenses}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        {incomingExpenses.length == 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}>
            <Text color={{...FONTS.h3, Color: COLORS.primary}}>No record</Text>
          </View>
        )}
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    // Filter expenses with "Comfirmed" status
    let chartData = categories.map((item) => {
      let confirmExpenses = item.expenses.filter((a) => a.status == 'C');
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    // Filter out categories with no data/expenses
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartData;
  }

  function setSelectedCategoryByName(name) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0,
    );

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <VictoryPie
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: (props) => {
                        let categoryName = chartData[props.index].name;
                        setSelectedCategoryByName(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
          data={chartData}
          colorScale={colorScales}
          labels={(datum) => `${datum.y}`}
          radius={({datum}) =>
            selectedCategory && selectedCategory.name == datum.name
              ? SIZES.width * 0.4
              : SIZES.width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({innerRadius}) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: {fill: 'white', ...FONTS.body3},
            parent: {
              ...styles.shadow,
            },
          }}
          width={SIZES.width * 0.8}
          height={SIZES.width * 0.8}
        />

        <View style={{position: 'absolute', top: '42%', left: '42%'}}>
          <Text style={{...FONTS.h1, textAlign: 'center'}}>
            {totalExpenseCount}
          </Text>
          <Text style={{textAlign: 'center', ...FONTS.body3}}>Expenses</Text>
        </View>
      </View>
    );
  }

  function renderExpenseSumary() {
    let data = processCategoryDataToDisplay();

    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            let categoryName = item.name;
            setSelectedCategoryByName(categoryName);
          }}
          style={{
            flexDirection: 'row',
            height: 40,
            paddingHorizontal: SIZES.radius,
            borderRadius: 10,
            backgroundColor:
              selectedCategory && selectedCategory.name == item.name
                ? item.color
                : COLORS.white,
          }}>
          {/* Name/ Category */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  selectedCategory && selectedCategory.name == item.name
                    ? COLORS.white
                    : item.color,
                borderRadius: 5,
              }}></View>
            <Text
              style={{
                marginLeft: SIZES.base,
                color:
                  selectedCategory && selectedCategory.name == item.name
                    ? COLORS.white
                    : COLORS.primary,
                ...FONTS.h3,
              }}>
              {item.name}
            </Text>

            {/* Expenses */}
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  color:
                    selectedCategory && selectedCategory.name == item.name
                      ? COLORS.white
                      : COLORS.primary,
                  ...FONTS.h3,
                }}>
                {item.y} USD - {item.label}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightGray2}}>
      {/* Nav Bar Section */}
      {renderNavBar()}

      {/* Header Section */}
      {renderHeader()}

      {/* Category Header Section */}
      {renderCategoryHeaderSection()}

      <ScrollView
        contentContainerStyle={{paddingBottom: 60}}
        showsVerticalScrollIndicator={false}>
        {viewMode == 'list' && (
          <View>
            {renderCategoryList()}
            {renderIncomingExpenses()}
          </View>
        )}
        {viewMode == 'chart' && (
          <View>
            {renderChart()}
            {renderExpenseSumary()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default Home;
